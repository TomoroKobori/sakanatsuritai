// const express = require('express');
import express from "express";
const router = express.Router();

/* GET home page. */
router.get('/', function(_req: any, res: any, _next: any) {
  res.render('index');
});

module.exports = router;
