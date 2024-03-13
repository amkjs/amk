import { db } from '../lib/db.mjs';

export class Country {
  constructor() {
    this.dbName = 'countries';
    this.db = db(this.dbName);
  }

  async get({ q, sort, pagination }) {
    return this.db
      .orderBy(sort.key, sort.order)
      .where()
      .limit(pagination.limit)
      .offset(pagination.offset);
  }

  async getByCode(code) {
    return db(this.dbName).where({ code }).first();
  }
}