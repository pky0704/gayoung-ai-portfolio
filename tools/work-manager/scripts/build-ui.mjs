import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
await mkdir('public',{recursive:true});
await build({entryPoints:['ui/app.js'],bundle:true,minify:true,platform:'browser',target:['es2020'],outfile:'public/manager.js',legalComments:'eof'});
const css=await readFile('ui/style.css','utf8');await writeFile('public/manager.css',css);
const data=JSON.parse(await readFile('seed/works.json','utf8'));
const assets={};for(const work of data){if(work.thumbnailId){assets[work.thumbnailId]='data:image/png;base64,'+(await readFile('seed/images/'+work.thumbnailId+'.png')).toString('base64');}}
const injected=JSON.stringify({works:data,assets}).replaceAll('<','\\u003c');
const js=(await readFile('public/manager.js','utf8')).replaceAll('</script','<\\/script');
let html=await readFile('ui/index.html','utf8');
html=html.replace('<link rel="stylesheet" href="/manager.css">',()=>'<style>'+css+'</style>').replace('<script src="/manager.js" defer></script>','');
html=html.replace('</body>',()=>'<script>window.WORK_PREVIEW='+injected+';</script><script>'+js+'</script></body>');
await writeFile('preview.html',html);
console.log('UI bundle and standalone preview built.');
