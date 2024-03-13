/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('continents', (t) => {
    t.string('code').primary();
    t.string('name');
  }).createTable('countries', (t) => {
    t.string('code').primary();
    t.string('name');
    t.integer('phone');
    t.string('symbol');
    t.string('capital');
    t.string('currency');
    t.string('continent_code').references('continents.code');
    t.string('alpha_3');
  }).createTable('persons', (t) => {
    t.increments('id').primary();
    t.string('first_name');
    t.string('last_name');
    t.string('country_code').references('countries.code');
  })
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('persons');
  knex.schema.dropTable('countries');
  knex.schema.dropTable('continents');
};
