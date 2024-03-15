import request from 'supertest';
import { app } from '../../src/api.mjs';
import { up, down } from '../index.mjs';
import { expect } from 'chai';

const paginationHelper = async () => {

}

describe('/countries API test', () => {
  beforeEach(async () => {
    await up();
  });
  afterEach(async () => {
    await down();
  });
  describe('GET /country', () => {
    it('Should return all countries', () => {
      return request(app)
        .get('/continents')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const {body} = res;
          expect(body).to.be.an('array');
          expect(body).to.have.length(7);
        });
    });
  });
  describe('GET /continents/:id', () => {
    it('Should return a continent with the given id', () => {
      return request(app)
        .get('/continents/AS')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body).to.have.property('code', 'AS');
          expect(body).to.have.property('name', 'Asia');
        });
    });
    it('Should return 404 if the continent with the given id does not exist', () => {
      return request(app)
        .get('/continents/XX')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const { body } = res;
          expect(body).to.be.deep.equal({});
        });
    });
  });
});
