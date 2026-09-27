import fs from 'fs';
import { fetchProjectsFromNeon, fetchStateSummariesFromNeon } from '../src/services/neonDb.js';

// Setup environment for node script
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\r\n]+)"?/);
process.env.DATABASE_URL = match[1];

async function testFullSync() {
  console.time('fetch_and_map_all');
  const [states, projects] = await Promise.all([
    fetchStateSummariesFromNeon(),
    fetchProjectsFromNeon({ limit: 5000 })
  ]);
  console.timeEnd('fetch_and_map_all');

  console.log(`Loaded ${Object.keys(states).length} states and ${projects.length} projects.`);

  // Verify consistency for every single state!
  console.log('\n--- Checking Consistency Between State Summaries and Project Records ---');
  let allConsistent = true;

  for (const [stateName, stateSummary] of Object.entries(states)) {
    const matchingProjects = projects.filter(p => p.state.toLowerCase() === stateName.toLowerCase());
    const countMatch = stateSummary.totalProjects === matchingProjects.length;
    if (!countMatch) {
      console.warn(`❌ MISMATCH in ${stateName}: Summary says ${stateSummary.totalProjects}, but found ${matchingProjects.length} projects!`);
      allConsistent = false;
    }
  }

  if (allConsistent) {
    console.log('✅ PERFECT 100% CONSISTENCY! Every state count in summaries matches project records EXACTLY.');
  } else {
    console.log('❌ Some states had count mismatches.');
  }

  // Sample check for Maharashtra
  const mhProjects = projects.filter(p => p.state === 'Maharashtra');
  console.log(`\nMaharashtra Summary Count: ${states['Maharashtra']?.totalProjects}`);
  console.log(`Maharashtra Projects Found: ${mhProjects.length}`);
}

testFullSync().catch(console.error);
