const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, Bookmark } = require('../../db/models')

const router = express.Router();

router.get('/:userId/:noteId', asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const noteId = req.params.noteId

  const bookmark = await Bookmark.findAll({ where: { userId, noteId } })
  //console.log("???????????", bookmark)
  return res.json(bookmark);

  // const notes = await Note.findAll(
  //   {
  //     where: { isPublic: true },
  //     // include: [{ model: Bookmark, where }],
  //     order: [['updatedAt', 'DESC']]
  //   });
  // // const notes = await Note.findAll({ where: { isPublic: true }, order: [['updatedAt', 'DESC']] });
  // return res.json(notes);
}))

module.exports = router;
