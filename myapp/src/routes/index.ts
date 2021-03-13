// const express = require('express');
import express from "express";
import { PrismaClient } from '@prisma/client'
const router = express.Router();

const prisma = new PrismaClient()

/* GET home page. */
router.get('/', async (req, res, next) => {
  const users = await prisma.user.findMany()
  console.log(users)
  res.render('index');
});

module.exports = router;
