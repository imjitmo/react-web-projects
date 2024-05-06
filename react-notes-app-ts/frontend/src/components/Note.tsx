import { Note as NoteModel } from '@/models/Notes';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import moment from 'moment';
import { useState } from 'react';

import { TrashIcon } from '@radix-ui/react-icons';
import UpdateNote from './UpdateNote';

interface NoteProps {
  noteProps: NoteModel;
  onDeleteNoteClicked: (id: string) => void;
  onNoteAdded: (note: NoteModel) => void;
}
const Note = ({ noteProps, onDeleteNoteClicked, onNoteAdded }: NoteProps) => {
  const { _id, title, text, createdAt } = noteProps;
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Card
        onClick={() => setShowDialog(true)}
        className="w-auto md:w-[400px] h-auto shrink-0 bg-yellow-100 cursor-pointer shadow drop-shadow-lg"
      >
        <CardHeader>
          <CardTitle className="flex justify-between">
            {title}
            <TrashIcon
              className="text-red-400"
              onClick={(e) => {
                onDeleteNoteClicked(_id);
                e.stopPropagation();
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{text}</p>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 border-t-4 py-2">
          <p className="text-xs">
            <strong className="italic">Created:</strong> {moment(createdAt).format('L LT')}
          </p>
          <p className="text-xs">
            {/* <strong className="italic">Updated:</strong> {moment(updatedAt).format('L LT')} */}
          </p>
        </CardFooter>
      </Card>
      <UpdateNote
        noteProps={noteProps}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onNoteAdded={onNoteAdded}
      />
    </>
  );
};

export default Note;
