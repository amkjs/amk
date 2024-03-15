import { db } from '../lib/db.mjs';

export class BaseModel {
  constructor(dbName) {
    this.dbName = dbName;
  }

  getDB() {
    return db(this.dbName);
  }

  async getCount(q = {}) {
    const rs = await this.getDB().count('* as count').first();
    return rs.count;
  }
}