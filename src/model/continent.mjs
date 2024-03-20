import { BaseModel } from './base.mjs';

/*
  * This class is responsible for handling the business logic of the continent entity.
  * fields:
  * code: string
  * name: string
 */
export class Continent extends BaseModel {
  constructor() {
    super('continents');
  }

  async get() {
    return this.getDB().select('code', 'name');
  }

  async getByCode(code) {
    return this.getDB()
      .where({ code })
      .select('code', 'name')
      .first();
  }
}