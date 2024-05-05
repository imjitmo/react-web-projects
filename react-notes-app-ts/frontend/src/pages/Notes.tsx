import CreateNote from '@/components/CreateNote';
import Note from '@/components/Note';
import { Button } from '@/components/ui/button';
import { fetchNotes } from '@/hooks/useNotesData';
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
  if (data && data?.length === 0) return <p>No notes found....</p>;

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
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {data?.map((note) => (
          <Note key={note._id} noteProps={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
