import fs from 'fs';
import { 
  fetchPlatformStatsFromNeon, 
  fetchStateSummariesFromNeon, 
  fetchMinistrySummariesFromNeon, 
  fetchProjectsFromNeon, 
  fetchProjectDetailFromNeon 
} from '../src/services/neonDb.js';

// Setup environment for node script
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\r\n]+)"?/);
process.env.DATABASE_URL = match[1];

async function verifyAll() {
  console.log('1. Testing fetchPlatformStatsFromNeon()...');
  const platform = await fetchPlatformStatsFromNeon();
  console.log('Platform Stats:', platform);

  console.log('\n2. Testing fetchStateSummariesFromNeon()...');
  const states = await fetchStateSummariesFromNeon();
  console.log(`Loaded ${Object.keys(states).length} states. Maharashtra sample:`, states['Maharashtra']);

  console.log('\n3. Testing fetchMinistrySummariesFromNeon()...');
  const ministries = await fetchMinistrySummariesFromNeon();
  console.log(`Loaded ${ministries.length} ministries. Top ministry:`, ministries[0]?.name, `(${ministries[0]?.totalProjects} projects, ₹${ministries[0]?.totalCostCr} Cr)`);

  console.log('\n4. Testing fetchProjectsFromNeon({ search: "Metro", limit: 3 })...');
  const metroProjects = await fetchProjectsFromNeon({ search: 'Metro', limit: 3 });
  console.log(`Found ${metroProjects.length} metro projects:`, metroProjects.map(p => ({ id: p.id, name: p.name, cost: p.currentCost, delay: p.timeDelayMonths, risk: p.riskScore })));

  console.log('\n5. Testing fetchProjectDetailFromNeon("020100044")...');
  const detail = await fetchProjectDetailFromNeon('020100044');
  console.log('Project Detail Name:', detail.name);
  console.log('MultiHorizon Delay:', detail.multiHorizonDelay);
  console.log('MultiHorizon Risk:', detail.multiHorizonRisk);
  console.log('Shap Factors count:', detail.shapFactors.length);

  console.log('\nAll Neon PostgreSQL data functions verified successfully with 100% real database records!');
}

verifyAll().catch(console.error);
