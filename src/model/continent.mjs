import { db } from '../lib/db.mjs';

export class Continent {
  constructor() {
    this.dbName = 'continents';
  }

  async get() {
    return db(this.dbName).select();
  }

  async getByCode(code) {
    return db(this.dbName).where({ code }).first();
  }
}