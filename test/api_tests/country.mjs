import request from 'supertest';
import { expect } from 'chai';

import { app } from '../../src/api.mjs';
import { up, down } from '../index.mjs';
import { paginationHelper as pgHelper } from './helper.mjs';

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_LENGTH = 252;


const paginationHelper = async ({ path, params }) => {
  const res = await pgHelper({ client: request(app), path, params });
  const [ first ] = res.body.data;
  expect(first).to.have.property('code');
  expect(first).to.have.property('name');
  expect(first).to.not.have.property('continent');
  return res;
}


describe('/countries API test', () => {
  beforeEach(async () => {
    await up();
  });
  afterEach(async () => {
    await down();
  });
  describe('GET /countries', () => {
    it('Should return first 10 countries if no limit is provided', async () => {
      const res = await paginationHelper({ path: '/countries', params: {} });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(DEFAULT_LIMIT);
      expect(data.length).to.be.equal(DEFAULT_LIMIT);
      expect(first).to.have.property('code', 'AF');
      expect(first).to.have.property('name', 'Afghanistan');

    });
    it('Should return next 10 countries if limit and offset is 10', async () => {
      const argOffset = 10;
      const params = { limit: DEFAULT_LIMIT, offset: argOffset };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(argOffset);
      expect(limit).to.be.equal(DEFAULT_LIMIT);
      expect(data.length).to.be.equal(DEFAULT_LIMIT);
      expect(first).to.have.property('code', 'AR');
      expect(first).to.have.property('name', 'Argentina');
    });
    it('Should return 1 when limit is 1', async () => {
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('code', 'AF');
      expect(first).to.have.property('name', 'Afghanistan');
    });
    it('Should sort by name in descending order if sort=-name', async () => {
      const argSort = '-name';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('code', 'ZW');
      expect(first).to.have.property('name', 'Zimbabwe');
    });
    it('Should not sort if key is wrong', async () => {
      const argSort = 'random';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('code', 'AF');
      expect(first).to.have.property('name', 'Afghanistan');
    });
    it('Should return filtered results if a filter is provided', async () => {
      const argQ = { name: 'unite'};
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(5);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('code', 'TZ');
      expect(first).to.have.property('name', 'Tanzania, United Republic of');
    });
    it('Should return results if a filter is incorrect', async () => {
      const argQ = { wrongKey: 'unite'};
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/countries', params });
      const { body } = res;
      const { data, total, offset, limit } = body;
      const [ first ] = data;
      expect(total).to.be.equal(DEFAULT_LENGTH);
      expect(offset).to.be.equal(DEFAULT_OFFSET);
      expect(limit).to.be.equal(argLimit);
      expect(data.length).to.be.equal(argLimit);
      expect(first).to.have.property('code', 'AF');
      expect(first).to.have.property('name', 'Afghanistan');
    });
  });
  describe('GET /countries/:id', () => {
    it('Should return a continent with the given id', () => {
      return request(app)
        .get('/countries/AS')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body).to.have.property('code', 'AS');
          expect(body).to.have.property('name', 'American Samoa');
          expect(body.continent).to.have.property('code', 'OC');
          expect(body.continent).to.have.property('name', 'Oceania');
        });
    });
    it('Should return 404 if the continent with the given id does not exist', () => {
      return request(app)
        .get('/countries/XX')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.deep.equal({});
        });
    });
  });
});
