import fs from 'fs';
import { neon } from '@neondatabase/serverless';

async function auditStates() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/DATABASE_URL="?([^"\r\n]+)"?/)[1];
  const sql = neon(dbUrl);

  const geoJson = JSON.parse(fs.readFileSync('src/data/india.json', 'utf8'));
  const geoStates = geoJson.features.map(f => f.properties.st_nm || f.properties.NAME_1 || f.properties.name).filter(Boolean);
  
  const dbStates = await sql`SELECT state, total_projects FROM state_summaries ORDER BY total_projects DESC;`;
  const dbStateNames = dbStates.map(s => s.state);

  console.log('--- States in GeoJSON (Total:', geoStates.length, ') ---');
  console.log(geoStates.sort());

  console.log('\n--- States in Neon DB (Total:', dbStates.length, ') ---');
  console.log(dbStateNames.sort());

  // Check which geo states are in DB and vice versa
  const missingInDb = geoStates.filter(g => !dbStateNames.some(d => d.toLowerCase() === g.toLowerCase()));
  console.log('\nGeo states with no exact match in Neon DB:', missingInDb);
}

auditStates().catch(console.error);
