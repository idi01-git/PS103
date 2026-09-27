import { neon } from '@neondatabase/serverless';
import fs from 'fs';

async function main() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/DATABASE_URL="?([^"\r\n]+)"?/);
  const dbUrl = match[1];
  const sql = neon(dbUrl);
  const pCount = await sql`SELECT count(*) FROM projects;`;
  const prCount = await sql`SELECT count(*) FROM predictions;`;
  console.log('Current rows:', { projects: pCount[0].count, predictions: prCount[0].count });
}
main();
