import { Note } from '@/models/Notes';
import axios, { AxiosRequestConfig } from 'axios';

const fetchData = async (input: RequestInfo, init?: AxiosRequestConfig) => {
  try {
    const res = await axios(`${input}`, init);

    return res;
  } catch (err) {
    console.error(err);
    const errorBody = err;
    const errorMessage: string = (errorBody as Error).message;
    throw new Error(errorMessage);
  }
};

export async function fetchNotes(): Promise<Note[]> {
  try {
    const res = await fetchData('/api/notes', { method: 'GET' });
    const data = res?.data ? res.data : [];

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
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
  return res.data.note;
}

export async function deleteNote(id: string) {
  await fetchData(`/api/notes/delete/${id}`, { method: 'DELETE' });
}

export async function updateNote(id: string, note: NoteInput): Promise<Note[]> {
  const res = await fetchData(`/api/notes/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: note,
  });

  return res.data.noteUpdate;
}
