import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

interface UserInteraction {
  showInteraction: boolean;
  setShowInteraction: React.Dispatch<React.SetStateAction<boolean>>;
}

const userSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Must be a valid email',
    }),
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(8, 'Must be at least 8 characters')
    .max(14, 'Must be at most 14 characters'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Must be at least 8 characters')
    .max(24, 'Must be at most 24 characters')
    .regex(passwordValidation, {
      message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
    }),
});

const LoginRegister = ({ showInteraction, setShowInteraction }: UserInteraction) => {}) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof userSchema>) => {};
  return (
    <Dialog open={showInteraction} onOpenChange={setShowInteraction}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>Create a note and show it on the dashboard</DialogDescription>
        </DialogHeader>
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
              {isLoading ? <ReloadIcon className="animate-spin size-6" /> : 'Add Note'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRegister;
