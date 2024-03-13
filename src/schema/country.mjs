export const queryCountrySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    phone: { type: 'number' },
    symbol: { type: 'string' },
    capital: { type: 'string' },
    currency: { type: 'string' },
    continent_code: { type: 'string' },
    alpha_3: { type: 'string' },
  },
};
