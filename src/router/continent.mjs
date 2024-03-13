import express from 'express';
import wrap from 'amk-wrap';

const router = express.Router();
const jsonParser = express.json();

export const continentRouter = (continentController) => {
  router.get('/', wrap(continentController, 'getContinent'));
  router.get('/:code', wrap(continentController, 'getOneContinent'));
  return router;
}