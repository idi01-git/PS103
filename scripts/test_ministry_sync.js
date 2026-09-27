import fs from 'fs';
import { fetchProjectsFromNeon, fetchMinistrySummariesFromNeon } from '../src/services/neonDb.js';

// Setup environment for node script
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\r\n]+)"?/);
process.env.DATABASE_URL = match[1];

async function testMinistrySync() {
  const [ministries, projects] = await Promise.all([
    fetchMinistrySummariesFromNeon(),
    fetchProjectsFromNeon({ limit: 5000 })
  ]);

  console.log(`Loaded ${ministries.length} ministries and ${projects.length} projects.`);

  console.log('\n--- Checking Consistency Between Ministry Summaries and Project Records ---');
  let allConsistent = true;

  for (const min of ministries) {
    const matchingProjects = projects.filter(p => p.ministry.toLowerCase() === min.name.toLowerCase());
    const countMatch = min.totalProjects === matchingProjects.length;
    console.log(`${min.name}: Summary = ${min.totalProjects}, Found = ${matchingProjects.length}, Delayed = ${min.delayed}`);
    if (!countMatch) {
      allConsistent = false;
    }
  }

  if (allConsistent) {
    console.log('✅ PERFECT 100% CONSISTENCY ACROSS ALL MINISTRIES!');
  }
}

testMinistrySync().catch(console.error);
