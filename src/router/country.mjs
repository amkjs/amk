import express from 'express';
import wrap from 'amk-wrap';

const router = express.Router();
const jsonParser = express.json();

export const countryRouter = (countryController) => {
  router.get('/:code', wrap(countryController, 'getCountry'));
  router.get('/', wrap(countryController, 'getAll'));
  return router;
}