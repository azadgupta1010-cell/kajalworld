// ============================================================================
//  One-off migration runner for the Kajalworld Supabase database.
//  Runs the SQL files in supabase/migrations in order (0001 -> 0002 -> 0003).
//  Reads the DB password from the SUPABASE_DB_PASSWORD env var so the secret
//  is never written to disk.
//
//  Usage (PowerShell):
//    $env:SUPABASE_DB_PASSWORD="your-password"; node scripts/run-migrations.mjs
// ============================================================================

import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(__dirname, '..', 'supabase', 'migrations')

const password = process.env.SUPABASE_DB_PASSWORD
if (!password) {
  console.error('ERROR: SUPABASE_DB_PASSWORD env var is not set.')
  process.exit(1)
}

const client = new pg.Client({
  host: 'aws-0-ap-northeast-2.pooler.supabase.com',
  port: 5432, // session pooler — correct port for running migrations
  database: 'postgres',
  user: 'postgres.zbjnebkwhwjuywkfugis',
  password,
  ssl: { rejectUnauthorized: false },
})

async function main() {
  await client.connect()
  console.log('Connected to Supabase Postgres.\n')

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), 'utf8')
    process.stdout.write(`Running ${file} ... `)
    await client.query(sql)
    console.log('OK')
  }

  // Quick verification
  const { rows } = await client.query('select slug, name from events order by sort_order')
  console.log(`\nSeeded ${rows.length} events:`)
  for (const r of rows) console.log(`  - ${r.slug}: ${r.name}`)

  await client.end()
  console.log('\nAll migrations applied successfully.')
}

main().catch(async (err) => {
  console.error('\nMIGRATION FAILED:', err.message)
  try { await client.end() } catch {}
  process.exit(1)
})
