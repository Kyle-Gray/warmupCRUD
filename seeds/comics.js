'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comics').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comics').insert({
          id: 1,
          series: 'Batman',
          issue: 1,
          description: 'Always be yourself unless you can be batman... then be batman'
        }),
        knex('comics').insert({
          id: 2,
          series: 'Superman',
          issue: 5,
          description:'watch out for krypotonite'
        }),
        knex('comics').insert({
          id: 3,
          series: 'Kyle',
          issue: 10000,
          description: 'is awesome at making crud apps < 1 hour'
        })
      ]);
    });
};
