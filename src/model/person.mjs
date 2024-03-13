import { db } from '../lib/db.mjs';
import { personRequestSchema } from '../schema/person.mjs';
import { ajv } from '../lib/ajv.mjs';
export class Person {
  constructor() {
    this.dbName = 'persons'
    this.validate = ajv.getSchema('personRequestSchema');
  }

  getDB() {
    return db(this.dbName)
  }
  async get() {
    return this.getDB().select();
  }

  async getById(id) {
    return this.getDB().where({ id }).first();
  }

  async save(data){
    this.validate(data);
    return this.getDB().insert(data, ['id', 'first_name', 'last_name', 'country_code']);
  }

  async update(id, data) {
    this.validate(data);
    return this.getDB().where({ id }).update(data, ['id', 'first_name', 'last_name', 'country_code']);
  }
}