import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { useCreateCustomer } from '@/hooks/use/useCustomers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const customerSchema = z.object({
  csFirstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(1, 'First Name is required'),
  csLastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(1, 'Last Name is required'),
  csEmail: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address')
    .min(1, 'Email is required'),
  csRewardPoints: z.coerce.number().min(0, 'Reward Points must be greater than or equal to 0'),
});

const AddForm = () => {
  const { registerCustomer, isCreating } = useCreateCustomer();
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      csFirstName: '',
      csLastName: '',
      csEmail: '',
      csRewardPoints: 0,
    },
  });
  const handleRegisterCustomer = (values: z.infer<typeof customerSchema>) => {
    registerCustomer(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegisterCustomer)} className="flex flex-col flex-wrap gap-4">
        <FormField
          control={form.control}
          name="csFirstName"
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
          name="csLastName"
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
        <FormField
          control={form.control}
          name="csEmail"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="csRewardPoints"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Reward Points" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-row flex-wrap gap-4">
          <Button className="grow bg-orange-500" disabled={isCreating}>
            {isCreating ? 'Adding Customer...' : 'Add Customer'}
          </Button>
          <Button type="button" className="shrink bg-red-500" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default AddForm;
