'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comics', (table) => {
    table.increments();
    table.text('series').notNullable().defaultTo('');
    table.integer('issue').notNullable().defaultTo(0);
    table.text('description').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('comics');
};
