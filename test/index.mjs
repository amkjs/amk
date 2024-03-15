import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../src/lib/db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsConfig = {
  directory: path.join(__dirname, '../migrations'),
}
const seedConfig = {
  directory: path.join(__dirname, '../seeds'),
}

export const up = async () => {
  console.log('up');
  await db.migrate.latest(migrationsConfig);
  await db.seed.run(seedConfig);
}

export const down = async () => {
  console.log('down')
  await db.migrate.rollback(migrationsConfig, true);
}

export const mochaGlobalSetup = async () => {}

export const mochaGlobalTeardown = async () => {
  await db.destroy();
}