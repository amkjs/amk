import request from 'supertest';
import { expect } from 'chai';

import { app } from '../../src/api.mjs';
import { up, down } from '../index.mjs';
import { paginationHelper as pgHelper } from './helper.mjs';

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_LENGTH = 13;


const paginationHelper = async ({ path, params }) => {
  const res = await pgHelper({ client: request(app), path, params });
  const [ first ] = res.body.data;
  expect(first).to.not.have.property('country');
  return res;
}


describe('/persons API test', () => {
  beforeEach(async () => {
    await up();
  });
  afterEach(async () => {
    await down();
  });
  describe('GET /persons', () => {
    it('Should return first 10 countries if no limit is provided', async () => {
      const res = await paginationHelper({ path: '/persons', params: {} });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(DEFAULT_LIMIT);
      expect(data.length).to.be.equal(DEFAULT_LIMIT);
      expect(first).to.have.property('id', 1);
      expect(first).to.have.property('first_name', 'John');

    });
    it('Should return next 3 countries if limit and offset is 10', async () => {
      const argOffset = 10;
      const params = { limit: DEFAULT_LIMIT, offset: argOffset };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(argOffset);
      expect(limit).to.be.equal(DEFAULT_LIMIT);
      expect(data.length).to.be.equal(3);
      expect(first).to.have.property('id', 11);
      expect(first).to.have.property('first_name', 'Blake');
    });
    it('Should return 1 when limit is 1', async () => {
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('id', 1);
      expect(first).to.have.property('first_name', 'John');
    });
    it('Should sort by name in descending order if sort=-name', async () => {
      const argSort = '-first_name';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('id', 5);
      expect(first).to.have.property('first_name', 'Zoe');
    });
    it('Should not sort if key is wrong', async () => {
      const argSort = 'random';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('id', 1);
      expect(first).to.have.property('first_name', 'John');
    });
    it('Should return filtered results if a filter is provided', async () => {
      const argQ = { first_name: 'ohn'};
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(2);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('id', 1);
      expect(first).to.have.property('first_name', 'John');
    });
    it('Should return results if a filter is incorrect', async () => {
      const argQ = { wrongKey: 'unite'};
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/persons', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('id', 1);
      expect(first).to.have.property('first_name', 'John');
    });
  });
  describe('GET /persons/:id', () => {
    it('Should return a continent with the given id', () => {
      return request(app)
        .get('/persons/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body).to.have.property('id', 1);
          expect(body).to.have.property('first_name', 'John');
          expect(body).to.have.property('country');
          expect(body.country).to.have.property('continent');
        });
    });
    it('Should return 404 if the continent with the given id does not exist', () => {
      return request(app)
        .get('/persons/99')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.deep.equal({});
        });
    });
  });
});
