// const express = require('express');
import express from "express";
const router = express.Router();

// index
router.get('/', function (req, res, next) {
  res.render('fishingspots/index', {
    fishingspots: []
  });
});

// new
router.get('/new', function(req, res, next) {
  res.render('fishingspots/new');
});

// create
router.post('/', function (req, res, next) {
  res.redirect('/fishingspots');
});

// edit
// router.get('/:id/edit', function (req, res, next) {
//   models.FishingSpot.findByPk(req.params.id, {
//   }).then(fishingspot => {
//     res.render('fishingspots/edit', {
//       fishingspot: fishingspot
//     });
//   });
// });

// // update
// router.put('/:id', function (req, res, next) {
//   models.FishingSpot.findByPk(req.params.id, {
//   }).then(fishingspot => {
//     fishingspot.update({
//       name: req.body.name
//     })
//   }).then(fishingspot => {
//     res.redirect('/fishingspots');
//   });
// });

// destroy
// router.delete('/:id', function (req, res, next) {
//   models.FishingSpot.findByPk(req.params.id, {
//   }).then(fishingspot => {
//     fishingspot.destroy();
//   }).then(fishingspot => {
//     res.redirect('/fishingspots');
//   });
// });

module.exports = router;