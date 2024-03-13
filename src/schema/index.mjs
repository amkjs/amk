import { ajv } from '../lib/ajv.mjs';

import { personRequestSchema, queryPersonSchema } from './person.mjs';
import { queryCountrySchema } from './country.mjs';

export const initSchema = () => {
  ajv.addSchema(personRequestSchema, 'personRequestSchema');
  ajv.addSchema(queryPersonSchema, 'queryPersonSchema');
  ajv.addSchema(queryCountrySchema, 'queryCountrySchema')
}