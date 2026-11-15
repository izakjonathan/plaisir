import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as maintenance from '../lib/maintenance.ts';
import * as publicPages from '../lib/public-pages.ts';
function harness(enabled=true){
 const exports:Record<string,any>={};
 class ResponseMock{body:unknown;options:any;constructor(body:unknown,options:any){this.body=body;this.options=options;}static next(){return {headers:new Headers()};}}
 vm.runInNewContext(ts.transpileModule(readFileSync(new URL('../proxy.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,require:(name:string)=>name==='next/server'?{NextResponse:ResponseMock}:name==='./lib/public-pages'?publicPages:{...maintenance,COMING_SOON:enabled}});
 return (path:string, headers:HeadersInit={})=>exports.proxy({nextUrl:new URL(path,'https://www.plaisirnyc.com'),headers:new Headers(headers)});
}
test('coming soon still replaces public pages and directly opened previews',()=>{
 const proxy=harness();
 for(const path of ['/','/investors','/financials','/financials-v2','/?preview=draft','/investors?preview=draft']){
  const r=proxy(path);assert.equal(r.options.status,200);assert.equal(r.body,maintenance.comingSoonHTML);assert.equal(r.options.headers['Cache-Control'],'private, no-store');
 }
 assert.ok(!maintenance.comingSoonHTML.includes('<script'));
});
test('maintenance blocks unrelated APIs, invalid media paths and forecast downloads',()=>{
 const proxy=harness();for(const path of ['/api/other','/api/editor/other','/media/example','/forecasts/Plaisir-Investor-Forecast.pdf'])assert.equal(proxy(path).options.status,503);
});
test('disabling maintenance restores normal proxy behavior',()=>{
 assert.equal(harness(false)('/investors').headers.get('Cache-Control'),null);
 assert.equal(harness(false)('/admin').headers.get('Cache-Control'),'private, no-store');
});

test('the seed presentation and editor bypass maintenance with no indexing',()=>{
 const proxy=harness();
 assert.equal(proxy('/seed').headers.get('X-Robots-Tag'),'noindex, nofollow, noarchive');
 assert.equal(proxy('/seed/other').body,maintenance.comingSoonHTML);
});

test('editor actions, uploaded images and embedded draft previews work during maintenance',()=>{
 const proxy=harness();
 for(const path of ['/admin','/api/editor/content','/api/editor/assets','/api/editor/upload','/seed?preview=draft']){
  assert.equal(proxy(path).headers.get('Cache-Control'),'private, no-store');
  assert.equal(proxy(path).headers.get('X-Robots-Tag'),'noindex, nofollow, noarchive');
 }
 const iframe={'sec-fetch-site':'same-origin','sec-fetch-dest':'iframe'};
 assert.equal(proxy('/?preview=draft',iframe).headers.get('Cache-Control'),'private, no-store');
 assert.equal(proxy('/investors?preview=draft',iframe).headers.get('Cache-Control'),'private, no-store');
 assert.equal(proxy('/investors',iframe).body,maintenance.comingSoonHTML);
 assert.equal(proxy('/media/01234567-89ab-cdef-0123-456789abcdef').headers.get('Cache-Control'),null);
});
