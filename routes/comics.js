'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const {camelizeKeys, decamelizeKeys} = require('humps');

router.get('/comics', (req, res, next) => {
  knex('comics')
  .orderBy('id')
  .then((comics) => {
    const camelComics = camelizeKeys(comics);
    res.send(camelComics);
  })
  .catch((err) => {
    next(err);
  });
});


router.post('/comics', (req, res, next) => {
  const decamelComics = decamelizeKeys(req.body);
  knex('comics')
  .where('description', req.body.description)
  .first()
  .then((results) => {
    if(!results){
      knex('comics')
      .insert({
        series: decamelComics.series,
        issue: decamelComics.issue,
        description: decamelComics.description
      }, '*')
      .then((comics) => {
        res.send(`${comics[0].series} successfully created!!`);
      })
      .catch((err) => {
        next(err);
      });
    } else {
      res.status(400).send('Comic already exists');
    }
  });
});

router.patch('/comics/:id', (req, res, next) => {
  const decamelComics = decamelizeKeys(req.body);
  knex('comics')
  .where('id', req.params.id)
  .first()
  .then((comic) => {
    if(!comic){
      next('this comic doesnt exist');
    }
    return knex('comics')
    .update({
      series: decamelComics.series,
      issue: decamelComics.issue,
      description: decamelComics.description
    }, '*')
    .where('id', req.params.id);
  })
  .then((comic) => {
    res.send(camelizeKeys(comic[0]));
  })
  .catch((err) => {
    next(err);
  });
});


router.delete('/comics/:id', (req, res, next) => {
  let comic;
  knex('comics')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if(!row){
      return next();
    }
    comic = row;
    return knex('comics')
    .del()
    .where('id', req.params.id);
  })
  .then(() => {
    delete comic.id;
    res.send(camelizeKeys(comic));
})
  .catch((err) =>{
    next(err);
  });
});


module.exports = router;
