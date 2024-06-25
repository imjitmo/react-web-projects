import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { useAddPointsToCustomer } from '@/hooks/use/useCustomers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const customerSchema = z.object({
  csRewardPoints: z.coerce.number().min(1, 'Reward Points must be greater than or equal to 1'),
});

const AddPoints = ({
  customerId,
  userName,
  userPoints,
  setOnOpen,
}: {
  customerId: string;
  userName: string;
  userPoints: number;
  setOnOpen: (prev: boolean) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      csRewardPoints: 0,
    },
  });

  const { addPoints, isAdding } = useAddPointsToCustomer();

  const handleAddPoints = (values: z.infer<typeof customerSchema>) => {
    addPoints(
      { csRewardPoints: values.csRewardPoints + userPoints, id: customerId },
      {
        onSuccess: () => {
          form.reset();
          setOnOpen((prev) => !prev);
          return;
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-col flex-wrap gap-0">
        <h1 className="text-3xl font-bold">User Information</h1>
        <p className="text-xs text-slate-500">{`ID#${customerId.slice(0, 8)}`}</p>
        <p className="text-sm italic">{userName}</p>

        <p className="text-sm">
          Current Reward Points: <span className="font-bold text-orange-500">{userPoints}</span>
        </p>
      </div>
      <Form {...form}>
        <form className="flex flex-col flex-wrap gap-4" onSubmit={form.handleSubmit(handleAddPoints)}>
          <FormField
            control={form.control}
            name="csRewardPoints"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Reward Points</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Reward Points" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-row flex-wrap gap-4">
            <Button className="grow bg-orange-500" disabled={isAdding}>
              {isAdding ? 'Adding...' : 'Add Points'}
            </Button>
            <Button type="button" className="shrink bg-red-500" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default AddPoints;
