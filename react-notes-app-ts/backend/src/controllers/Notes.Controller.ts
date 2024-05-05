import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import NoteModel from '../models/Notes';

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();

    if (!notes || notes.length === 0) throw createHttpError(404, 'Notes not found');

    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid Note ID');

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, 'Note not found');

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

interface createNoteBody {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<unknown, unknown, createNoteBody, unknown> = async (
  req,
  res,
  next
) => {
  const { title, text } = req.body;
  try {
    if (!title) throw createHttpError(400, 'Title is required');

    const note = new NoteModel({
      title,
      text,
    });
    await note.save();
    res.status(200).json({ success: true, note });
  } catch (err) {
    next(err);
  }
};

export const updateNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    if (title.length <= 0) throw createHttpError(400, 'Title is required');
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid Note ID');

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, 'Note not found');

    const noteUpdate = await NoteModel.findByIdAndUpdate(id, { title, text }, { new: true }).exec();

    noteUpdate ? res.status(200).json({ success: true, noteUpdate }) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid Note ID');

    const note = await NoteModel.findById(id).exec();
    if (!note) throw createHttpError(404, 'Note not found');

    const noteDelete = await NoteModel.findByIdAndDelete(id).exec();
    noteDelete ? res.status(200).json({ success: true }) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};
