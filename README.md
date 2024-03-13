# AMK

sample backend using express.js, knex.js, and amk plugins

## Pre-requisites:
- node.js

## How to run
1. install dependencies `npm install`
2. copy `.env.example` to `.env` and update the values'
3. run the app `npm start`
4. call the api endpoint `curll http://localhost:3000/persons`

## Initialize DB and seed data
1. run `npm run migrate`
2. run `npm run seed`
3. refer to `knexfile.js` for other configuration

## Tests
1. make sure dependencies are installed
2. run `npm test`

## License
[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)
