import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { request } from 'node:http';
import { createServer } from 'node:net';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const slugs = ['', 'diagnostic-center-software', 'pathology-reports', 'billing-accounts', 'features', 'demo', 'free-core', 'extensions', 'getting-started', 'about', 'faq', 'contact', 'solutions', 'pharmacy-management'];
const portProbe = createServer();
await new Promise((resolve, reject) => { portProbe.once('error', reject); portProbe.listen(0, '127.0.0.1', resolve); });
const port = portProbe.address().port;
await new Promise(resolve => portProbe.close(resolve));
const child = spawn(process.execPath, ['server.mjs'], { env: {...process.env, PORT: String(port)}, stdio: ['ignore', 'pipe', 'pipe'] });
const ready = new Promise((resolve, reject) => {
  child.stdout.once('data', resolve);
  child.once('error', reject);
  child.once('exit', code => reject(new Error(`Preview server exited before ready (${code})`)));
  setTimeout(() => reject(new Error('Preview server did not start')), 8000).unref();
});
function get(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = request({hostname:'127.0.0.1',port,path,method}, res => { let body=''; res.setEncoding('utf8'); res.on('data', chunk => body += chunk); res.on('end', () => resolve({status:res.statusCode,headers:res.headers,body})); });
    req.on('error', reject); req.end();
  });
}
try {
  await ready;
  for (const slug of slugs) for (const bn of [false,true]) {
    const page = `/${bn?'bn/':''}${slug?slug+'/':''}`;
    const other = `/${bn?'':'bn/'}${slug?slug+'/':''}`;
    const res = await get(page);
    assert.equal(res.status, 200, page);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.ok(res.body.includes(`<html lang="${bn?'bn':'en'}">`), `language: ${page}`);
    assert.ok(res.body.includes(`href="${other}"`), `language switch: ${page}`);
    assert.ok(res.body.includes('tel:+8801779440297') && res.body.includes('mailto:emran.alarif8@gmail.com') && res.body.includes('https://wa.me/8801779440297'), `contact: ${page}`);
    assert.equal((res.body.match(/<h1\b/g)||[]).length, 1, `main heading: ${page}`);
    if (slug) {
      assert.ok(!res.body.includes('<section class="hero">') && res.body.includes('class="page-heading"'), `compact page heading: ${page}`);
    } else {
      assert.ok(res.body.includes('<section class="hero">') && res.body.includes('class="hero-art"'), `home hero: ${page}`);
    }
    assert.ok(res.body.includes('rel="canonical"') && res.body.includes('hreflang="en"') && res.body.includes('hreflang="bn"'), `metadata: ${page}`);
    if (slug === 'contact') assert.ok(res.body.includes('id="inquiry-form"') && res.body.includes('type="submit" disabled'), `safe inquiry fallback: ${page}`);
    if (slug === 'demo') for (const id of ['reception','billing','samples','entry','verification','reports','closing']) assert.ok(res.body.includes(`id="${id}"`), `demo ${id}: ${page}`);
  }
  assert.equal((await get('/missing-page/')).status,404);
  assert.equal((await get('/%2e%2e/server.mjs')).status,403);
  assert.equal((await get('/', 'POST')).status,405);
  const sitemap = await get('/sitemap.xml');
  assert.equal((sitemap.body.match(/<url>/g)||[]).length,slugs.length * 2);
  assert.equal((await get('/robots.txt')).status,200);

  // Exercise the email draft without launching a mail app or sending information.
  const handlers={}, elements={};
  function el(id,value=''){return elements[id]={value,hidden:false,required:false,disabled:true,textContent:'',options:[],selectedIndex:0,addEventListener:(event,fn)=>{handlers[id+event]=fn;}};}
  const button={disabled:true}, form=el('inquiry-form'); form.querySelector=()=>button; form.reportValidity=()=>true;
  const type=el('inquiry-type','demo'); type.options=[{text:'Demo'}];
  const reply=el('inquiry-reply','phone'); reply.options=[{text:'Phone'},{text:'Email'}];
  el('inquiry-phone','01700000000'); el('inquiry-email','visitor@example.com'); el('inquiry-status'); el('email-field'); el('phone-field'); el('inquiry-name','Example Visitor'); el('inquiry-center','Example Center'); el('inquiry-district','Dhaka'); el('inquiry-message','Please contact me.');
  const mockWindow={location:{href:''}};
  runInNewContext(await readFile('dist/inquiry.js','utf8'),{document:{documentElement:{lang:'en'},querySelector:s=>elements[s.slice(1)]},window:mockWindow,location:{search:'?intent=demo'},URLSearchParams,encodeURIComponent});
  assert.equal(button.disabled,false); assert.equal(type.value,'demo'); assert.equal(elements['inquiry-phone'].required,true);
  reply.value='email';reply.selectedIndex=1;handlers['inquiry-replychange']();assert.equal(elements['inquiry-email'].required,true);assert.equal(elements['inquiry-phone'].required,false);
  handlers['inquiry-formsubmit']({preventDefault(){}});
  assert.ok(mockWindow.location.href.startsWith('mailto:emran.alarif8@gmail.com?'));
  assert.ok(decodeURIComponent(mockWindow.location.href).includes('visitor@example.com'));
  assert.match(elements['inquiry-status'].textContent,/Review and send/);
  console.log(`Launch checks passed: ${slugs.length * 2} bilingual routes, language links, contact destinations, demo anchors, metadata, sitemap, HTTP errors, and inquiry email draft.`);
} finally { child.kill(); }
