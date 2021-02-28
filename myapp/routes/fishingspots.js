const express = require('express');
const router = express.Router();
const models = require("../models");

// index
router.get('/', function (req, res, next) {
  models.FishingSpot.findAll({
  }).then(fishingspots => {
    res.render('fishingspots/index', {
      fishingspots: fishingspots
    });
  });
});

// new
router.get('/new', function(req, res, next) {
  res.render('fishingspots/new');
});

// create
router.post('/', function (req, res, next) {
  models.FishingSpot.create({
    name: req.body.name
  }).then(fishingspot => {
    res.redirect('/fishingspots');
  });
});

// edit
router.get('/:id/edit', function (req, res, next) {
  models.FishingSpot.findByPk(req.params.id, {
  }).then(fishingspot => {
    res.render('fishingspots/edit', {
      fishingspot: fishingspot
    });
  });
});

// update
router.put('/:id', function (req, res, next) {
  models.FishingSpot.findByPk(req.params.id, {
  }).then(fishingspot => {
    fishingspot.update({
      name: req.body.name
    })
  }).then(fishingspot => {
    res.redirect('/fishingspots');
  });
});

// destroy
router.delete('/:id', function (req, res, next) {
  models.FishingSpot.findByPk(req.params.id, {
  }).then(fishingspot => {
    fishingspot.destroy();
  }).then(fishingspot => {
    res.redirect('/fishingspots');
  });
});

module.exports = router;