import {readFile,writeFile} from 'node:fs/promises';
const [input,output,runId]=process.argv.slice(2);
if(!input||!output||!/^FLT-PHP-\d{2}-\d{8}-\d+$/.test(runId||''))throw new Error('Usage: prepare-run-config.mjs INPUT OUTPUT FLT-PHP-CC-YYYYMMDD-RUN');
const config=JSON.parse(await readFile(input,'utf8'));config.run_id=runId;await writeFile(output,JSON.stringify(config,null,2)+'\n');
