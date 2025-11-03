const fetch = require('node-fetch');

async function check(url){
  try{
    const res = await fetch(url);
    console.log(url, '=>', res.status);
    const body = await res.text();
    console.log('len', body.length);
  }catch(err){
    console.error(url, 'error', err.message);
  }
}

async function run(){
  const base = process.env.BASE || 'http://localhost:5000';
  await check(base + '/api/waste/categories');
  await check(base + '/api/recycling-centers');
  await check(base + '/api/pickups');
  await check(base + '/api/stats');
}

run().catch(err=>{ console.error(err); process.exit(1); });
