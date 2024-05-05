import { Note as NoteModel } from '@/models/Notes';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import moment from 'moment';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import UpdateNote from './UpdateNote';

interface NoteProps {
  noteProps: NoteModel;
}
const Note = ({ noteProps }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = noteProps;
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Card
        onClick={() => setShowDialog(true)}
        className="w-auto h-auto shrink-0 bg-yellow-100 cursor-pointer shadow drop-shadow-lg"
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{text}</p>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 border-t-4 py-2">
          <p className="text-xs">
            <strong className="italic">Created:</strong> {moment(createdAt).format('L LT')}
          </p>
          <p className="text-xs">
            <strong className="italic">Updated:</strong> {moment(updatedAt).format('L LT')}
          </p>
        </CardFooter>
      </Card>
      <UpdateNote showDialog={showDialog} setShowDialog={setShowDialog} />
    </>
  );
};

export default Note;
