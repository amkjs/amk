import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FileMigrationProvider, Migrator, NO_MIGRATIONS } from 'kysely/migration';
import { db } from '../src/lib/kysely.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs: await import('node:fs/promises'),
    path: await import('node:path'),
    migrationFolder: path.join(__dirname, '../migrations'),
  }),
});

const command = process.argv[2] || 'latest';

async function run() {
  let error: unknown;
  let results: unknown;

  if (command === 'latest' || command === 'up') {
    ({ error, results } = await migrator.migrateToLatest());
  } else if (command === 'down') {
    ({ error, results } = await migrator.migrateDown());
  } else if (command === 'reset') {
    ({ error, results } = await migrator.migrateTo(NO_MIGRATIONS));
  } else {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: tsx scripts/migrate.ts [latest|up|down|reset]');
    process.exitCode = 1;
    await db.destroy();
    return;
  }

  if (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } else {
    console.log('Migrations completed:', results);
  }
  await db.destroy();
}

run().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
