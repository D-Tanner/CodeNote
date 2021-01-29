const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models')

const router = express.Router();

router.patch("/edit/:id", asyncHandler(async function (req, res) {
  const id = req.params.id;
  let bodyString = req.body.content;
  //takes out <h1> tags
  const bodyTitle = bodyString.split('</h1>')[0].split('<h1>')[1]
  //takes out <p> tags
  let bodyContent = bodyString.split('</h1>')[1]
  bodyContent = bodyContent.slice(3, bodyContent.length - 4)
  //console.log("body!", bodyTitle)
  //console.log("content!", bodyContent)
  const note = await Note.findOne({ where: { id } });
  note.update({ title: bodyTitle, content: bodyContent })

  return res.json(note)
}))


module.exports = router;
