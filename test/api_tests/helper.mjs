import { expect } from 'chai';

export const paginationHelper = async ({ client, path, params }) => {
  const res = await client
    .get(path)
    .query(params);

  const { body, status } = res;
  expect(status).to.be.equal(200);
  expect(body).to.have.property('data');
  expect(body).to.have.property('total');
  expect(body).to.have.property('offset');
  expect(body).to.have.property('limit');
  return res;
}