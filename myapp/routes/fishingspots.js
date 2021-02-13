const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', function (req, res, next) {
  models.FishingSpot.findAll({
  }).then(fishingspots => {
    res.render('fishingspots/index', {
      fishingspots: fishingspots
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('fishingspots/new');
});

router.post('/', function (req, res, next) {
  models.FishingSpot.create({
    name: req.body.name
  }).then(fishingspot => {
    res.redirect('/fishingspots');
  });
});

module.exports = router;