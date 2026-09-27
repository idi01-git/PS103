import { neon } from '@neondatabase/serverless';
import fs from 'fs';

async function cleanStates() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/DATABASE_URL="?([^"\r\n]+)"?/)[1];
  const sql = neon(dbUrl);

  console.log('Cleaning and normalizing state names in Neon PostgreSQL...');

  const updates = [
    { target: 'Maharashtra', bad: ['MAHARASH TRA', 'Maharash tra', 'MAHARASHTRA'] },
    { target: 'Karnataka', bad: ['KARNATAK A', 'Karnatak a', 'KARNATAKA'] },
    { target: 'Chhattisgarh', bad: ['CHHATTISG ARH', 'Chhattisg arh', 'CHHATISGARH', 'Chhatisgarh', 'CHHATTISGARH'] },
    { target: 'Arunachal Pradesh', bad: ['ARUNACHA L PRADESH', 'Arunacha l pradesh', 'ARUNACHAL PRADESH'] },
    { target: 'Jammu and Kashmir', bad: ['JAMMU & KASHMIR', 'Jammu & Kashmir', 'JAMMU AND KASHMIR', 'Jammu & kashmir'] },
    { target: 'Andaman and Nicobar Islands', bad: ['ANDAMAN AND NICOBAR ISLANDS', 'Andaman and nicobar islands', 'Andaman & Nicobar Islands'] },
    { target: 'Multi-State', bad: ['MULTI STATE', 'Multi state', 'PAN INDIA', 'Pan india', 'OFFSHORE', 'Offshore', 'MULTI-STATE'] },
    { target: 'Odisha', bad: ['ORISSA', 'Orissa', 'ODISHA'] },
    { target: 'Uttarakhand', bad: ['UTTARANCHAL', 'Uttaranchal', 'UTTARAKHAND'] },
    { target: 'Tamil Nadu', bad: ['TAMIL NADU', 'Tamil nadu'] },
    { target: 'Uttar Pradesh', bad: ['UTTAR PRADESH', 'Uttar pradesh'] },
    { target: 'Andhra Pradesh', bad: ['ANDHRA PRADESH', 'Andhra pradesh'] },
    { target: 'Madhya Pradesh', bad: ['MADHYA PRADESH', 'Madhya pradesh'] },
    { target: 'West Bengal', bad: ['WEST BENGAL', 'West bengal'] },
    { target: 'Himachal Pradesh', bad: ['HIMACHAL PRADESH', 'Himachal pradesh'] }
  ];

  for (const item of updates) {
    for (const b of item.bad) {
      await sql`UPDATE projects SET state = ${item.target} WHERE LOWER(TRIM(state)) = LOWER(${b});`;
    }
  }

  // Also clean up trailing / leading whitespace
  await sql`UPDATE projects SET state = TRIM(state);`;

  // Re-populate state_summaries
  console.log('Refreshing state_summaries in Neon...');
  await sql`TRUNCATE TABLE state_summaries;`;

  await sql`
    INSERT INTO state_summaries (state, total_projects, total_cost_cr, on_time_projects, delayed_projects, high_risk_projects, avg_delay_months)
    SELECT 
      p.state,
      COUNT(p.project_id) as total_projects,
      ROUND(SUM(p.anticipated_cost), 2) as total_cost_cr,
      COUNT(CASE WHEN p.delay_months <= 0 THEN 1 END) as on_time_projects,
      COUNT(CASE WHEN p.delay_months > 0 THEN 1 END) as delayed_projects,
      COUNT(CASE WHEN pred.risk_band IN ('High', 'Critical') THEN 1 END) as high_risk_projects,
      ROUND(AVG(p.delay_months), 1) as avg_delay_months
    FROM projects p
    LEFT JOIN predictions pred ON p.project_id = pred.project_id AND pred.horizon = '18m'
    WHERE p.state IS NOT NULL AND p.state != ''
    GROUP BY p.state;
  `;

  // Verify states
  const results = await sql`
    SELECT state, total_projects, total_cost_cr, on_time_projects, delayed_projects 
    FROM state_summaries 
    ORDER BY total_projects DESC;
  `;
  console.log('Cleaned State Summaries: Total States =', results.length);
  console.table(results);
}

cleanStates().catch(console.error);
