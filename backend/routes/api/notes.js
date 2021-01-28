const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, Bookmark } = require('../../db/models')

const router = express.Router();


router.get('/global', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Note.findAll(
    {
      where: { isPublic: true },
      include: Bookmark,
      order: [['updatedAt', 'DESC']]
    });
  // const notes = await Note.findAll({ where: { isPublic: true }, order: [['updatedAt', 'DESC']] });
  console.log(notes)
  return res.json(notes);
}))

router.get('/:id/bookmarked', asyncHandler(async (req, res) => {
  //Find notes by public key
  const userId = req.params.id;
  const notes = await Note.findAll({ where: { userId }, order: [['updatedAt', 'DESC']] });

  return res.json(notes);
}))

router.get('/:id/personal', asyncHandler(async (req, res) => {
  //Find notes by public key
  const userId = req.params.id;
  //console.log(userId)
  const notes = await Note.findAll({ where: { userId }, order: [['updatedAt', 'DESC']] });

  return res.json(notes);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  //Find notes by public key
  const id = req.params.id;

  const notes = await Note.findAll({ where: { id }, include: [Bookmark], order: [['updatedAt', 'DESC']] });
  console.log(notes)
  return res.json(notes);
}))


//POST requests
router.post('/new', asyncHandler(async (req, res) => {

  const newNote = await Note.create({ title: 'Untitled', content: 'content', userId: req.body.userId, isPublic: false });

  return res.json(newNote);
}))

//Delete route with specific id
router.delete("/delete/:id", asyncHandler(async function (req, res) {
  const id = req.params.id

  const note = await Note.findOne({ where: { id } });

  note.destroy();
  return res.json(id);
}));

//Patch routes for updating bookmarks, global status, notes
router.patch("/bookmark/update/:id", asyncHandler(async function (req, res) {
  const id = req.params.id;
  const bookmark = await Bookmark.findOne({ where: { id } });
  await bookmark.update({ isBookmarked: !bookmark.isBookmarked })
  return res.json(bookmark)
}))

router.patch("/status/update/:id", asyncHandler(async function (req, res) {
  const id = req.params.id;
  const note = await Note.findOne({ where: { id } });
  await note.update({ isPublic: !note.isPublic })
  return res.json(note)
}))


module.exports = router;
