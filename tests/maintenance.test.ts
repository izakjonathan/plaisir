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
 return (path:string)=>exports.proxy({nextUrl:new URL(path,'https://www.plaisirnyc.com')});
}
test('coming soon replaces public pages, previews and the editor without app content',()=>{
 const proxy=harness();
 for(const path of ['/','/investors','/financials','/financials-v2','/admin','/?preview=draft']){
  const r=proxy(path);assert.equal(r.options.status,200);assert.equal(r.body,maintenance.comingSoonHTML);assert.equal(r.options.headers['Cache-Control'],'private, no-store');
 }
 assert.ok(!maintenance.comingSoonHTML.includes('<script'));
});
test('maintenance blocks content APIs, uploaded media and forecast downloads',()=>{
 const proxy=harness();for(const path of ['/api/editor/content','/api/editor/upload','/media/example','/forecasts/Plaisir-Investor-Forecast.pdf'])assert.equal(proxy(path).options.status,503);
});
test('disabling maintenance restores normal proxy behavior',()=>{
 assert.equal(harness(false)('/investors').headers.get('Cache-Control'),null);
 assert.equal(harness(false)('/admin').headers.get('Cache-Control'),'private, no-store');
});

test('only the direct seed presentation bypasses maintenance with no indexing',()=>{
 const proxy=harness();
 assert.equal(proxy('/seed').headers.get('X-Robots-Tag'),'noindex, nofollow, noarchive');
 assert.equal(proxy('/seed/other').body,maintenance.comingSoonHTML);
});
