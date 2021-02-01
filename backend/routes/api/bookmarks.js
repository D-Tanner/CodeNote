const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, Bookmark } = require('../../db/models')

const router = express.Router();

router.get('/:userId/:noteId', asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const noteId = req.params.noteId

  const bookmark = await Bookmark.findAll({ where: { userId, noteId } })

  return res.json(bookmark);


}))


router.get('/all/:userId', asyncHandler(async (req, res) => {
  const userId = req.params.userId


  const bookmark = await Bookmark.findAll({ where: { userId } })

  return res.json(bookmark);

}))

router.patch("/update/:userId/:noteId", asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  //const userId = req.params.userId
  //Needs to inlcude userId and noteId
  const bookmark = await Bookmark.findOne({ where: { userId, noteId } });
  await bookmark.update({ isBookmarked: !bookmark.isBookmarked })
  // console.log(bookmark)
  return res.json(bookmark)
}))


router.post('/new/:userId/:noteId', asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  const newBookmark = await Bookmark.create({ userId, noteId, isBookmarked: false });

  return res.json(newBookmark);
}))

router.delete('/delete/:userId/:noteId', asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;

  const bookmark = await Bookmark.findOne({ where: { noteId } });

  //bookmark.destroy();
  return;
}))

module.exports = router;
