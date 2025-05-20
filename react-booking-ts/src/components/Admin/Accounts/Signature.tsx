import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { UserSignatureUpdateProps } from '@/hooks/models/Users';
import { useUpdateUserSignature, useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSignature } from 'react-icons/fa';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

interface SignatureProps {
  id?: string;
  signature?: string;
  firstName?: string;
  lastName?: string;
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const updateRoomSchema = z.object({
  id: z.string().min(1, { message: 'Room Id is required' }),
  signature: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

const Signature = (userData: SignatureProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [viewImage, setViewImage] = useState<File | null>(null);
  const initialValues = {
    id: userData.id,
    signature: undefined,
  };

  const { isUpdateUserSignature, isUpdating } = useUpdateUserSignature();
  const { userActionLogs } = useUserLogs();

  const { userId, email, displayName, userType, setUserSignature } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      displayName: state.displayName,
      userType: state.userType,
      setUserSignature: state.setUserSignature,
    }))
  );
  const userLogData = {
    userId: userId ? userId : '',
    userEmail: email ? email : '',
    userName: displayName ? displayName : '',
    userType: userType ? userType : '',
  };

  const form = useForm<z.infer<typeof updateRoomSchema>>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const handleSumbit = (values: UserSignatureUpdateProps) => {
    isUpdateUserSignature(values, {
      onSuccess: (data) => {
        if (userId === userData.id) {
          setUserSignature(data.signature);
        }
        userActionLogs(
          {
            action: `Added/Updated a Signature for User ${userData.firstName} ${userData.lastName}`,
            ...userLogData,
          },
          {
            onSuccess: () => {
              form.reset();
              setOnOpen(false);
            },
          }
        );
      },
    });
  };
  return (
    <div>
      <Tiptools title="Add a Signature" titleClassName="text-slate-950 dark:text-slate-50">
        <FaSignature className="cursor-pointer" onClick={() => setOnOpen((prev) => !prev)} />
      </Tiptools>
      <Modal header="Add a Signature" onOpen={onOpen} setOnOpen={setOnOpen}>
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
              {viewImage && (
                <img
                  src={URL.createObjectURL(viewImage)}
                  className="size-48 rounded-2xl object-cover"
                  alt=""
                />
              )}
              <FormField
                control={form.control}
                name="signature"
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
                          onChange={(e) => {
                            onChange(e.target.files && e.target.files[0]);
                            setViewImage(e.target.files && e.target.files[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex justify-end w-full">
              <Button className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25">
                <span>{isUpdating ? <Loading size={20} /> : 'Update'} </span>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};
export default Signature;
