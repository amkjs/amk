import express from 'express';
import responseTime from 'response-time';
import errorHandler from 'api-error-handler';

import { ContinentController } from './controller/continent.mjs';
import { Continent } from './model/continent.mjs';
import { continentRouter } from './router/continent.mjs';

import { CountryController } from './controller/country.mjs'
import { Country } from './model/country.mjs'
import { countryRouter } from './router/country.mjs'

import { PersonController } from './controller/person.mjs';
import { Person } from './model/person.mjs';
import { personRouter } from './router/person.mjs'

import { initSchema } from './schema/index.mjs';

const app = express();
initSchema();

const continent = new Continent();
const country = new Country();
const person = new Person();

const continentController = new ContinentController({ continent });
const countryController = new CountryController({ country });
const personController = new PersonController({ person });

app.use(responseTime());
app.use('/persons', personRouter(personController));
app.use('/continents', continentRouter(continentController));
app.use('/countries', countryRouter(countryController));

app.use(errorHandler());

export { app };