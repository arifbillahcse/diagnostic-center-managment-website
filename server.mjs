import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), 'dist'));
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function respond(response, status, message) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD');
    return respond(response, 405, 'Method not allowed');
  }
  try {
    // Decode the raw path before URL normalization so traversal cannot be hidden.
    const pathname = decodeURIComponent((request.url || '/').split('?')[0]);
    const segments = pathname.split('/');
    if (!pathname.startsWith('/') || pathname.includes('\\') || pathname.includes('\0') ||
        segments.some(segment => segment === '..' || segment.startsWith('.'))) {
      return respond(response, 403, 'Forbidden');
    }
    let candidate = resolve(directory, `.${pathname}`);
    if (candidate !== directory && !candidate.startsWith(directory + sep)) {
      return respond(response, 403, 'Forbidden');
    }
    let info = await stat(candidate);
    if (info.isDirectory()) {
      candidate = resolve(candidate, 'index.html');
      info = await stat(candidate);
    }
    const actual = await realpath(candidate);
    if (!actual.startsWith(directory + sep) || !info.isFile()) {
      return respond(response, 403, 'Forbidden');
    }
    response.writeHead(200, {
      'Content-Type': types[extname(actual).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': 'no-cache'
    });
    if (request.method === 'HEAD') return response.end();
    const stream = createReadStream(actual);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch (error) {
    if (error instanceof URIError) return respond(response, 400, 'Invalid URL');
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return respond(response, 404, 'Not found');
    respond(response, 500, 'Server error');
  }
});

server.on('error', error => {
  console.error(`Cannot start preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`HospitalSoftwere preview: http://127.0.0.1:${port}`);
});
