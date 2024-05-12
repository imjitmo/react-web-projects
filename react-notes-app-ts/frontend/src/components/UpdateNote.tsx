import { Note } from '@/models/Notes';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

import { updateNote } from '@/hooks/useNotesData';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface UpdateProps {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  noteProps: Note;
  onNoteAdded: (note: Note) => void;
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(0),
});

const UpdateNote = ({ showDialog, setShowDialog, noteProps, onNoteAdded }: UpdateProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: noteProps?.title || '',
      text: noteProps?.text || '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await updateNote(noteProps._id, values);
      setShowDialog((prev) => !prev);
      setIsLoading(false);
      onNoteAdded(res[0]);
      return;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Note</DialogTitle>
          <DialogDescription>Note ID: {noteProps._id.slice(0, 5)}</DialogDescription>
        </DialogHeader>
        {/* FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Content" {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <Button disabled={isLoading}>
              {isLoading ? <ReloadIcon className="animate-spin size-6" /> : 'Update Note'}
            </Button>
          </form>
        </Form>
        {/* FORM */}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNote;
