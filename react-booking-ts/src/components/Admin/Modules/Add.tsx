import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useCreateModule } from '@/hooks/use/useModules';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from 'react-icons/io';

import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  'application/vnd.ms-powerpoint',
];

const addModuleSchema = z.object({
  moduleName: z
    .string()
    .min(1, { message: 'Module Name is required' })
    .max(50, { message: 'Module Name is too long' }),
  moduleImg: z
    .instanceof(File, { message: 'ppt/pptx/ppsx is required' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only .ppt, .pptx, .ppsx formats are supported.'
    ),
});

const initialValues = {
  moduleName: '',
  moduleImg: undefined,
};

const Add = () => {
  const [onOpen, setOnOpen] = useState(false);
  const { createNewModule, isCreating } = useCreateModule();
  const { userActionLogs } = useUserLogs();
  const form = useForm<z.infer<typeof addModuleSchema>>({
    resolver: zodResolver(addModuleSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const { userId, email, displayName, userType } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      displayName: state.displayName,
      userType: state.userType,
    }))
  );
  const userLogData = {
    userId: userId ? userId : '',
    userEmail: email ? email : '',
    userName: displayName ? displayName : '',
    userType: userType ? userType : '',
  };
  const handleSubmit = async (values: z.infer<typeof addModuleSchema>) => {
    createNewModule(values, {
      onSuccess: () => {
        userActionLogs(
          {
            action: `Added Module: ${values.moduleName}`,
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
    <>
      <Tiptools title="Add Module" titleClassName="text-sm text-blue-950 dark:text-slate-50">
        <Button
          variant="outline"
          className="bg-yellow-400 text-blue-950 hover:bg-blue-950 dark:bg-blue-950 hover:dark:bg-blue-800 hover:text-slate-50 dark:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <IoMdAddCircleOutline className="size-6" /> Add Module
        </Button>
      </Tiptools>
      <Modal header="Add a Training Module" onOpen={onOpen} setOnOpen={setOnOpen}>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="moduleName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="moduleImg"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => {
                return (
                  <FormItem className="w-full text-slate-50">
                    <FormLabel>Image</FormLabel>
                    <FormControl className="text-center bg-slate-50 text-blue-950 dark:bg-slate-900 dark:text-slate-50">
                      <Input
                        type="file"
                        placeholder="Image"
                        accept="application/*"
                        {...fieldProps}
                        onChange={(e) => onChange(e.target.files && e.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end w-full">
              <Button
                className="bg-slate-200 text-blue-950 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 w-25"
                disabled={isCreating}
              >
                <span>{isCreating ? <Loading size={20} /> : 'Add'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};
export default Add;
