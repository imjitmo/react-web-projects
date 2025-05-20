import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { UserImageUpdateProps } from '@/hooks/models/Users';
import { useUpdateUserImage } from '@/hooks/use/useUsers';

import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const updateRoomSchema = z.object({
  id: z.string().min(1, { message: 'Room Id is required' }),
  photo: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

interface ImageProps {
  id?: string;
  photo?: string;
}

const Image = (userData: ImageProps) => {
  const { isUpdateUserImage, isUpdating } = useUpdateUserImage();
  const initialValues = {
    id: userData.id,
    photo: undefined,
  };

  const form = useForm<z.infer<typeof updateRoomSchema>>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  const [onOpen, setOnOpen] = useState(false);
  const { setUserPhoto } = useStore(
    useShallow((state) => ({
      setUserPhoto: state.setUserPhoto,
    }))
  );

  const handleSumbit = (values: UserImageUpdateProps) => {
    isUpdateUserImage(values, {
      onSuccess: (data) => {
        form.reset();
        setOnOpen(false);
        setUserPhoto(data?.photo);
        // window.location.reload();
      },
    });
  };
  return (
    <>
      <Tiptools title="Update Image" titleClassName="text-slate-950 dark:text-slate-50">
        <img
          src={userData.photo}
          alt="room-img"
          className="size-8 rounded-4xl"
          onClick={() => setOnOpen((prev) => !prev)}
        />
      </Tiptools>
      <Modal header={'Update Profile Image'} onOpen={onOpen} setOnOpen={setOnOpen} className="w-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSumbit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => {
                return (
                  <FormItem className="hidden">
                    <FormLabel>Room Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Room Id" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-col flex-wrap items-center justify-center">
              <img src={userData.photo} className="size-48 rounded-2xl object-cover" alt="room-img" />
              <FormField
                control={form.control}
                name="photo"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => {
                  return (
                    <FormItem className="w-[300px] text-slate-50">
                      <FormLabel>Image</FormLabel>
                      <FormControl className="text-center bg-slate-50 text-blue-950 dark:bg-slate-900 dark:text-slate-50">
                        <Input
                          type="file"
                          placeholder="Image"
                          accept="image/*"
                          {...fieldProps}
                          onChange={(e) => onChange(e.target.files && e.target.files[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex justify-end w-full">
              <Button
                className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25"
                disabled={isUpdating}
              >
                <span>{isUpdating ? <Loading size={20} /> : 'Update'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};
export default Image;
