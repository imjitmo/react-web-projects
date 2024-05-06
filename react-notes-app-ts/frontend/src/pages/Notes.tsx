import CreateNote from '@/components/CreateNote';
import Note from '@/components/Note';
import { Button } from '@/components/ui/button';
import { deleteNote, fetchNotes } from '@/hooks/useNotesData';
import { Note as NoteModel } from '@/models/Notes';
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const Notes = () => {
  const [data, setData] = useState<NoteModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const notes = await fetchNotes();
        setData(notes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex w-full gap-2 justify-center items-center p-4">
        <ReloadIcon className="animate-spin size-6" /> <p className="text-sm italic">Loading...</p>
      </div>
    );

  const onDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setData(data.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="flex justify-between p-8">
        <p className="text-xl">
          <strong className="italic">Total Notes:</strong> {data?.length}
        </p>
        <Button onClick={() => setShowDialog(true)}>
          <PlusIcon /> Add Note
        </Button>
      </div>

      <CreateNote
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onNoteAdded={(addedNote) => {
          setData([...data, addedNote]);
        }}
      />
      {data && data.length > 0 ? (
        <div className="flex flex-wrap flex-col md:flex-row gap-4 justify-center items-center w-full">
          {data?.map((note) => (
            <Note
              key={note._id}
              noteProps={note}
              onDeleteNoteClicked={onDeleteNote}
              onNoteAdded={(updatedNote) =>
                setData(data.map((note) => (note._id === updatedNote._id ? updatedNote : note)))
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No notes found</p>
      )}
    </div>
  );
};

export default Notes;
