const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Fectch Notes 'GET : /api/notes/fetchnotes'
router.get('/fetchnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
});

// ROUTE 2 : Add Note 'POST : /api/notes/addnote'
router.post('/addnote', [
  body('title', 'Enter valid title.').isLength({ min: 3 }),
  body('description', 'Description must be min 5 characters long.').isLength({ min: 5 }),
  body('tags', 'Tags must be min 3 characters long.').isLength({ min: 5 }),
], fetchuser, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const note = new Notes({ title, description, tags, user: req.user.id })
    const sendNotes = note.save();
    res.json({"Success" : "Note has been added", note: note});
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
});

// ROUTE 3 : Update Note 'PUT : /api/notes/updatenote/:id'
router.put('/updatenote/:id', [
  body('title', 'Enter valid title.').isLength({ min: 3 }),
  body('description', 'Description must be min 5 characters long.').isLength({ min: 5 }),
  body('tags', 'Tags must be min 3 characters long.').isLength({ min: 5 }),
], fetchuser, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const newNote = {};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tags) {newNote.tags = tags};

    // find note by id to update
    let note = await Notes.findById(req.params.id);
    if(!note) {
      return res.status(404).send("Note not found.")
    }

    // check if note is of same user
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Note not allowed.")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json(note);
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
});

// ROUTE 3 : Delete Note 'DELETE : /api/notes/deletenote/:id'
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // find note by id to update
    let note = await Notes.findById(req.params.id);
    if(!note) {
      return res.status(404).send("Note not found.")
    }

    // check if note is of same user
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Note not allowed.")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note});
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
});

module.exports = router;