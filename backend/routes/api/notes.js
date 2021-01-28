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
  const notes = await Note.findAll({ where: { userId }, order: [['updatedAt', 'DESC']] });
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
  //console.log(notes)
  //Need to add a filter
  return res.json(notes);
}))


//POST requests
router.post('/new', asyncHandler(async (req, res) => {

  const newNote = await Note.create({ title: 'Untitled', content: 'content', userId: req.body.userId, isPublic: false, isBookmarked: false });

  return res.json(newNote);
}))

//Delete route with specific id
router.delete("/delete/:id", asyncHandler(async function (req, res) {
  const id = req.params.id
  console.log(id)
  const note = await Note.findOne({ where: { id } });
  // console.log(note)
  note.destroy();
  return res.json(id);
}));

module.exports = router;
