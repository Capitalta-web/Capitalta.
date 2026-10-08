import { readFileSync } from 'node:fs';
function loadEnv(p){const e={};try{for(const l of readFileSync(p,'utf8').split('\n')){const m=l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);if(m)e[m[1]]=m[2].replace(/^["']|["']$/g,'');}}catch(x){}return e;}
const env={...loadEnv('.env'),...loadEnv('.env.local')};
const PAT=env.SUPABASE_ACCESS_TOKEN, REF='kzytjaiobipsgomocjxi';
export async function sql(query){
  const r=await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`,{
    method:'POST',headers:{Authorization:`Bearer ${PAT}`,'Content-Type':'application/json'},
    body:JSON.stringify({query})
  });
  const t=await r.text();
  if(!r.ok) throw new Error(`HTTP ${r.status}: ${t}`);
  return JSON.parse(t);
}
