// const express = require('express');
import express from "express";
const router = express.Router();

// index
router.get('/', function (req, res, next) {
  res.render('fishes/index', {
    fishes: []
  });
});

// new
router.get('/new', function(req, res, next) {
  res.render('fishes/new');
});

// create
router.post('/', function (req, res, next) {
  res.redirect('/fishes');
});

// edit
// router.get('/:id/edit', function (req, res, next) {
//   models.Fish.findByPk(req.params.id, {
//   }).then(fish => {
//     res.render('fishes/edit', {
//       fish: fish
//     });
//   });
// });

// update
// router.put('/:id', function (req, res, next) {
//   models.Fish.findByPk(req.params.id, {
//   }).then(fish => {
//     fish.update({
//       name: req.body.name
//     })
//   }).then(fish => {
//     res.redirect('/fishes');
//   });
// });

// destroy
// router.delete('/:id', function (req, res, next) {
//   models.Fish.findByPk(req.params.id, {
//   }).then(fish => {
//     fish.destroy();
//   }).then(fish => {
//     res.redirect('/fishes');
//   });
// });

module.exports = router;