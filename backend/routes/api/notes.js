const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notes } = require('../../db/models')

const router = express.Router();


router.get('/api/notes/global', asyncHandler(async (req, res) => {
  //Find notes by public key
  const notes = await Notes.findAll();
  //Need to add a filter
  return res.json(notes);
}))
