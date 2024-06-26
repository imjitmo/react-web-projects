import express from 'express';

import * as NotesController from '../controllers/Notes.Controller';

const router = express.Router();

router.get('/', NotesController.getNotes);

router.get('/:id', NotesController.getNote);

router.post('/create', NotesController.createNotes);

router.patch('/update/:id', NotesController.updateNote);

router.delete('/delete/:id', NotesController.deleteNote);

export default router;
