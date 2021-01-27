const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models')

const router = express.Router();


router.get('/global', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Note.findAll({ where: { isPublic: true } });
  //backend server
  //console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))

router.get('/:id/bookmarked', asyncHandler(async (req, res) => {
  //Find notes by public key
  const userId = req.params.id;
  const notes = await Note.findAll({ where: { userId, isBookmarked: true } });
  //backend server
  //console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))

router.get('/:id/personal', asyncHandler(async (req, res) => {
  //Find notes by public key
  const userId = req.params.id;
  //console.log(userId)
  const notes = await Note.findAll({ where: { userId } });
  //backend server
  //console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  //Find notes by public key
  const id = req.params.id;
  //console.log(userId)
  const notes = await Note.findAll({ where: { id } });
  //backend server
  console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))

module.exports = router;
