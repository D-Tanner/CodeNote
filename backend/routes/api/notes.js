const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models')

const router = express.Router();


router.get('/global', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Note.findAll({ where: { isPublic: true } });
  //backend server
  console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))

router.get('/bookmarked', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Note.findAll({ where: { isBookmarked: true } });
  //backend server
  console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))


module.exports = router;
