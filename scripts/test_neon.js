import { neon } from '@neondatabase/serverless';
import fs from 'fs';

async function main() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/DATABASE_URL="?([^"\r\n]+)"?/);
  if (!match) {
    throw new Error('DATABASE_URL not found in .env.local');
  }
  const dbUrl = match[1];
  console.log('Connecting to Neon PostgreSQL...');
  const sql = neon(dbUrl);
  const result = await sql`SELECT version(), current_database(), current_user;`;
  console.log('Successfully connected to Neon PostgreSQL!');
  console.log('Database:', result[0].current_database);
  console.log('User:', result[0].current_user);
  console.log('Version:', result[0].version);
}

main().catch(err => {
  console.error('Connection failed:', err);
  process.exit(1);
});
