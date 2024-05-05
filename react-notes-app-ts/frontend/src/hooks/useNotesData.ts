import { Note } from '@/models/Notes';
import axios from 'axios';

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const res = await axios(`${input}`, init);

    return res;
  } catch (err) {
    console.error(err);
    const errorBody = err;
    const errorMessage = errorBody?.message;
    throw new Error(errorMessage);
  }
};

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData('/api/notes', { method: 'GET' });
  const data = res.data;
  return data;
}

export interface NoteInput {
  title: string;
  text: string;
}

export async function addNote(note: NoteInput): Promise<Note[]> {
  const res = await fetchData('/api/notes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: note,
  });
  return res.data;
}
