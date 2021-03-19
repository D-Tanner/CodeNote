const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note, Bookmark, User } = require('../../db/models')

const router = express.Router();


router.get('/global', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Note.findAll(
    {
      where: { isPublic: true },
      include: [{ model: User }],
      order: [['updatedAt', 'DESC']]
    });
  return res.json(notes);
}))


router.get('/:id/bookmarked', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const bookmarks = await Bookmark.findAll({
    where: { userId, isBookmarked: true },
    include: [{ model: Note }, { model: User }],
    order: [['updatedAt', 'DESC']]
  });

  return res.json(bookmarks);

}))

router.get('/:id/personal', asyncHandler(async (req, res) => {
  //Find notes by public key
  const userId = req.params.id;
  const notes = await Note.findAll({
    where: { userId },
    include: [{ model: User }],
    order: [['updatedAt', 'DESC']]
  });

  return res.json(notes);
}))

// router.get('/note/:userId', asyncHandler(async (req, res) => {
//   //Find notes by public key
//   const User = await User.findAll(
//     {
//       where: { isPublic: true },
//       order: [['updatedAt', 'DESC']]
//     });
//   return res.json(notes);
// }))

router.get('/:id', asyncHandler(async (req, res) => {
  //Find notes by public key
  const id = req.params.id;
  const notes = await Note.findAll({ where: { id }, order: [['updatedAt', 'DESC']] });
  return res.json(notes);
}))


//POST requests
router.post('/new', asyncHandler(async (req, res) => {

  const newNote = await Note.create({ title: 'Untitled', content: 'content', userId: req.body.userId, isPublic: false });

  return res.json(newNote);
}))

router.post('/copy', asyncHandler(async (req, res) => {
  console.log('here in copy')
  const userId = req.body.userId
  const title = req.body.title
  const content = req.body.content

  const newNote = await Note.create({ title, content, userId, isPublic: false });

  return res.json(newNote);
}))

//Delete route with specific id
router.delete("/delete/:id", asyncHandler(async function (req, res) {
  const id = req.params.id

  const note = await Note.findOne({ where: { id } });
  const bookmark = await Bookmark.destroy({ where: { noteId: id } })

  note.destroy();

  return res.json(id);
}));


router.patch("/status/update/:id", asyncHandler(async function (req, res) {
  const id = req.params.id;
  const note = await Note.findOne({ where: { id } });
  await note.update({ isPublic: !note.isPublic })
  return res.json(note)
}))

// router.patch("/notes/edit/:id", asyncHandler(async function (req, res) {
//   const id = req.params.id;
//   let bodyString = req.body.content;
//   //takes out <h1> tags
//   const bodyTitle = bodyString.split('</h1>')[0].split('<h1>')[1]
//   //takes out <p> tags
//   let bodyContent = bodyString.split('</h1>')[1]
//   bodyContent = bodyContent.slice(3, bodyContent.length - 4)
//   console.log("body!", bodyTitle)
//   console.log("content!", bodyContent)
//   const note = await Note.findOne({ where: { id } });
//   note.update({ title: bodyTitle, content: bodyContent })

//   return res.json(note)
// }))


module.exports = router;
