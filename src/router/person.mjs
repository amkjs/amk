import express from 'express';
import wrap from 'amk-wrap';

const router = express.Router();
const jsonParser = express.json();

export const personRouter = (personController) => {
  router.get('/', wrap(personController, 'getAll'));
  router.get('/:code', wrap(personController, 'getOne'));
  router.post('/', jsonParser, wrap(personController, 'createPerson'));
  return router;
}