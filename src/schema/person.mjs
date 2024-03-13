
import { ajv } from '../lib/ajv.mjs';

export const personRequestSchema = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    country_code: { type: 'string' },
  },
  required: ['first_name', 'country_code'],
};

export const queryPersonSchema = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    country_code: { type: 'string' },
  },
};

