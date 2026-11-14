import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const project = dirname(fileURLToPath(import.meta.url));
const root = resolve(project, 'dist');
const failures = [];
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile()) files.push(path);
  }
}

await walk(root);
if (!files.includes(resolve(root, 'index.html'))) failures.push('Missing dist/index.html');
const htmlFiles = files.filter(file => extname(file) === '.html');
const documents = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
    if (ids.has(match[1])) failures.push(`${relative(root, file)}: duplicate id "${match[1]}"`);
    ids.add(match[1]);
  }
  documents.set(file, { html, ids });
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${relative(root, file)}: missing page title`);
  if (!/name\s*=\s*["']viewport["']/i.test(html)) failures.push(`${relative(root, file)}: missing viewport metadata`);
  if (!/<html\b[^>]*\blang\s*=/i.test(html)) failures.push(`${relative(root, file)}: missing document language`);
}

async function checkReference(file, raw, type) {
  const value = raw.trim().replaceAll('&amp;', '&');
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return;
  let target;
  let fragment;
  try {
    const hashPosition = value.indexOf('#');
    fragment = hashPosition >= 0 ? decodeURIComponent(value.slice(hashPosition + 1)) : '';
    const path = decodeURIComponent((hashPosition >= 0 ? value.slice(0, hashPosition) : value).split('?')[0]);
    target = !path ? file : resolve(path.startsWith('/') ? root : dirname(file), path.replace(/^\//, ''));
    if (target !== root && !target.startsWith(root + sep)) throw new Error('reference escapes dist');
    const info = await stat(target);
    if (info.isDirectory()) target = resolve(target, 'index.html');
    if (!(await stat(target)).isFile()) throw new Error('not a file');
  } catch (error) {
    failures.push(`${relative(root, file)}: broken ${type} "${raw}" (${error.message})`);
    return;
  }
  if (fragment && documents.has(target) && !documents.get(target).ids.has(fragment)) {
    failures.push(`${relative(root, file)}: missing anchor "${fragment}" in ${relative(root, target)}`);
  }
}

for (const [file, { html }] of documents) {
  for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']*)["']/gi)) {
    await checkReference(file, match[1], 'asset/link');
  }
  const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  for (const [, attributes, source] of inlineScripts) {
    if (/\bsrc\s*=|\btype\s*=\s*["'](?:application\/ld\+json|importmap)["']/i.test(attributes) || !source.trim()) continue;
    try {
      execFileSync(process.execPath, ['--input-type=module', '--check'], { input: source, stdio: ['pipe', 'pipe', 'pipe'] });
    } catch (error) {
      failures.push(`${relative(root, file)}: inline JavaScript syntax error\n${error.stderr?.toString() || error.message}`);
    }
  }
}

for (const file of files.filter(file => extname(file) === '.css')) {
  const css = await readFile(file, 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    await checkReference(file, match[1], 'CSS asset');
  }
}

const scripts = [...files.filter(file => ['.js', '.mjs'].includes(extname(file))), resolve(project, 'server.mjs'), fileURLToPath(import.meta.url)];
for (const file of scripts) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    failures.push(`${relative(project, file)}: JavaScript syntax error\n${error.stderr?.toString() || error.message}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checks passed: ${htmlFiles.length} HTML page(s), local assets and anchors, ${scripts.length} JavaScript file(s).`);
}
