// const express = require('express');
import express from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// index
router.get('/', async (req, res, next) => {
  const fishingSpots = await prisma.fishingSpot.findMany();
  res.render('fishingSpots/index', {
    fishingSpots: fishingSpots
  });
});

// new
router.get('/new', (req, res, next) => {
  res.render('fishingSpots/new');
});

// create
router.post('/', async (req, res, next) => {
  const { name } = req.body
  await prisma.fishingSpot.create({
    data: {
      name
    },
  })
  res.redirect('/fishingSpots');
});

// edit
router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params
  const fishingSpot = await prisma.fishingSpot.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render('fishingSpots/edit', {
    fishingSpot: fishingSpot
  });
});

// // update
router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
  await prisma.fishingSpot.update({
    where: { id: Number(id) },
    data: { name: name }
  });
  res.redirect('/fishingSpots');
});

// destroy
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  await prisma.fishingSpot.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect('/fishingSpots');
});

module.exports = router;