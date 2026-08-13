import {readFile,writeFile} from 'node:fs/promises';
const [input,output,runId]=process.argv.slice(2);
const validRunId=/^FLT-[A-Z]{3}-\d{2}(?:-\d{3}-\d{3})?-\d{8}-\d+$/;
if(!input||!output||!validRunId.test(runId||''))throw new Error('Usage: prepare-run-config.mjs INPUT OUTPUT FLT-BBB-CC[-VVV-VVV]-YYYYMMDD-RUN');
const config=JSON.parse(await readFile(input,'utf8'));config.run_id=runId;await writeFile(output,JSON.stringify(config,null,2)+'\n');
