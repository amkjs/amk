import { db } from '../lib/db.mjs';
import { applyFilter } from '../utils/query.mjs';
export class BaseModel {
  constructor(dbName) {
    this.dbName = dbName;
  }

  getDB() {
    return db(this.dbName);
  }

  async getCount(q = {}) {
    const db_ = applyFilter(q, this.getDB());
    const rs = await db_.count('* as count').first();
    return rs.count;
  }
}