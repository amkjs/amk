import { describe, it, beforeEach, afterEach, after } from 'node:test';
import request from 'supertest';
import { expect } from 'expect';

import { app } from '../../src/api.js';
import { up, down, teardown } from '../index.js';
import { paginationHelper as pgHelper } from './helper.js';
import { ErrorResponse, PersonItem, PaginatedResponse } from '../../src/types/api-response.js';

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_LENGTH = 13;

const paginationHelper = async ({ path, params }: { path: string; params: Record<string, unknown> }) => {
  const res = await pgHelper({ client: request(app), path, params });
  const body = res.body as PaginatedResponse<PersonItem>;
  const [first] = body.data;
  expect(first).not.toHaveProperty('country');
  return res;
};

describe('/persons API test', () => {
  beforeEach(async () => {
    await up();
  });
  afterEach(async () => {
    await down();
  });
  after(async () => {
    await teardown();
  });
  describe('GET /persons', () => {
    it('Should return first 10 persons if no limit is provided', async () => {
      const res = await paginationHelper({ path: '/persons', params: {} });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(DEFAULT_LIMIT);
      expect(data).toHaveLength(DEFAULT_LIMIT);
      expect(first).toHaveProperty('id', 1);
      expect(first).toHaveProperty('first_name', 'John');
    });
    it('Should return next 3 persons if limit and offset is 10', async () => {
      const argOffset = 10;
      const params = { limit: DEFAULT_LIMIT, offset: argOffset };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(argOffset);
      expect(limit).toBe(DEFAULT_LIMIT);
      expect(data).toHaveLength(3);
      expect(first).toHaveProperty('id', 11);
      expect(first).toHaveProperty('first_name', 'Blake');
    });
    it('Should return 1 when limit is 1', async () => {
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(argLimit);
      expect(data).toHaveLength(argLimit);
      expect(first).toHaveProperty('id', 1);
      expect(first).toHaveProperty('first_name', 'John');
    });
    it('Should sort by name in descending order if sort=-name', async () => {
      const argSort = '-first_name';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(argLimit);
      expect(data).toHaveLength(argLimit);
      expect(first).toHaveProperty('id', 5);
      expect(first).toHaveProperty('first_name', 'Zoe');
    });
    it('Should not sort if key is wrong', async () => {
      const argSort = 'random';
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, sort: argSort };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(argLimit);
      expect(data).toHaveLength(argLimit);
      expect(first).toHaveProperty('id', 1);
      expect(first).toHaveProperty('first_name', 'John');
    });
    it('Should return filtered results if a filter is provided', async () => {
      const argQ = { first_name: 'ohn' };
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(2);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(argLimit);
      expect(data).toHaveLength(argLimit);
      expect(first).toHaveProperty('id', 1);
      expect(first).toHaveProperty('first_name', 'John');
    });
    it('Should return results if a filter is incorrect', async () => {
      const argQ = { wrongKey: 'unite' };
      const argLimit = 1;
      const params = { limit: argLimit, offset: DEFAULT_OFFSET, ...argQ };
      const res = await paginationHelper({ path: '/persons', params });
      const body = res.body as PaginatedResponse<PersonItem>;
      const { data, total, offset, limit } = body;
      const [first] = data;
      expect(total).toBe(DEFAULT_LENGTH);
      expect(offset).toBe(DEFAULT_OFFSET);
      expect(limit).toBe(argLimit);
      expect(data).toHaveLength(argLimit);
      expect(first).toHaveProperty('id', 1);
      expect(first).toHaveProperty('first_name', 'John');
    });
  });
  describe('POST /persons', () => {
    it('Should create a person with valid payload', async () => {
      const res = await request(app)
        .post('/persons')
        .send({ first_name: 'Alice', last_name: 'Wonder', country_code: 'US' })
        .expect('Content-Type', /json/)
        .expect(200);
      const body = res.body as PersonItem;
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('first_name', 'Alice');
      expect(body).toHaveProperty('country_code', 'US');
    });
    it('Should return 400 with validation errors for invalid payload', async () => {
      const res = await request(app)
        .post('/persons')
        .send({ last_name: 'MissingFirstName', country_code: 'GB' })
        .expect('Content-Type', /json/)
        .expect(400);
      const body = res.body as ErrorResponse;
      expect(body).toHaveProperty('message', 'Validation failed');
      expect(body).toHaveProperty('errors');
      expect(body.errors).toBeInstanceOf(Array);
      expect(body.errors?.length).toBeGreaterThan(0);
    });
    it('Should return 400 with validation errors for empty body', async () => {
      const res = await request(app)
        .post('/persons')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);
      const body = res.body as ErrorResponse;
      expect(body).toHaveProperty('message', 'Validation failed');
      expect(body).toHaveProperty('errors');
      expect(body.errors).toBeInstanceOf(Array);
    });
  });
  describe('GET /persons/:id', () => {
    it('Should return a person with the given id', async () => {
      const res = await request(app)
        .get('/persons/1')
        .expect('Content-Type', /json/)
        .expect(200);
      const body = res.body as PersonItem;
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty('id', 1);
      expect(body).toHaveProperty('first_name', 'John');
      expect(body).toHaveProperty('country');
      expect(body.country).toHaveProperty('continent');
    });
    it('Should return 404 if the person with the given id does not exist', async () => {
      const res = await request(app)
        .get('/persons/99')
        .expect('Content-Type', /json/)
        .expect(200);
      const body = res.body as Record<string, unknown>;
      expect(body).toEqual({});
    });
  });
});
