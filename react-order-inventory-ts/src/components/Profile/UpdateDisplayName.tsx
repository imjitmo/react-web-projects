import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { useUpdateAuthDisplayName, useUpdateStaffDisplayName } from '@/hooks/use/useStaff';
import { useStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useShallow } from 'zustand/react/shallow';

const DisplayNameSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(1, 'First Name is required'),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(1, 'Last Name is required'),
});

const UpdateDisplayName = ({ setOnOpen }: { setOnOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { updateAuthDisplayName, isUpdating } = useUpdateAuthDisplayName();
  const { updateStaffName, isUpdating: isUpdatingStaff } = useUpdateStaffDisplayName();
  const { email: currentEmail, setUserLoginData } = useStore(
    useShallow((state) => ({
      email: state.email,
      setUserLoginData: state.setUserLoginData,
    }))
  );
  const form = useForm<z.infer<typeof DisplayNameSchema>>({
    resolver: zodResolver(DisplayNameSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const handleSubmitDisplayName = async (data: z.infer<typeof DisplayNameSchema>) => {
    const displayName = `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`;
    console.log(displayName);
    updateAuthDisplayName(
      { email: currentEmail || '', displayName: displayName },
      {
        onSuccess: () => {
          updateStaffName(
            {
              email: currentEmail || '',
              displayName: displayName,
            },
            {
              onSuccess: (data) => {
                setOnOpen(false);
                setUserLoginData({
                  userId: data?.user?.id,
                  email: data?.user?.email || '',
                  displayName: data?.user?.user_metadata?.displayName,
                  userType: data?.user?.user_metadata?.userType,
                });
              },
            }
          );
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitDisplayName)} className="flex flex-col flex-wrap gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow bg-orange-500" disabled={isUpdating || isUpdatingStaff}>
            Update
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setOnOpen(false);
            }}
            disabled={isUpdating || isUpdatingStaff}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdateDisplayName;
