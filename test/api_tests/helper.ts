import { expect } from 'expect';

export const paginationHelper = async ({ client, path, params }: {
  client: { get: (path: string) => { query: (params: Record<string, unknown>) => Promise<{ body: unknown; status: number }> } };
  path: string;
  params: Record<string, unknown>;
}) => {
  const res = await client
    .get(path)
    .query(params);

  const { body, status } = res;
  expect(status).toBe(200);
  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('total');
  expect(body).toHaveProperty('offset');
  expect(body).toHaveProperty('limit');
  return res;
};
