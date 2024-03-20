import { extractQueryParams } from '../../../src/utils/query.mjs';
import { expect } from 'chai';

describe('utils test', () => {
  describe('extractQueryParams', () => {
    it('Should extract query from the input with respect to validKeys', () => {
      const query = { name: 'John', age: 20 };
      const validKeys = ['name'];
      const result = extractQueryParams(query, validKeys);
      expect(result).to.be.deep.equal({ name: 'John' });
    });
    it('Should return nothing if no validKeys', () => {
      const query = { name: 'John', age: 20 };
      const result = extractQueryParams(query, []);
      expect(result).to.be.deep.equal({});
    });
    it('Should return nothing if no input', () => {
      const result = extractQueryParams();
      expect(result).to.be.deep.equal({});
    });
  });
});