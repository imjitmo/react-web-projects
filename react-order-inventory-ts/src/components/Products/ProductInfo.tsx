import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductInfo = ({ handleSubmit }: { handleSubmit: (value: any) => void }) => {
  const form = useForm({
    defaultValues: {
      dishName: '',
      dishDescription: '',
      dishPrice: '',
      dishImage: '',
    },
    reValidateMode: 'onSubmit',
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="dishName"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Dish Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dish name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="dishDescription"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="dishPrice"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="dishImage"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl className="text-center bg-slate-800/50">
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
        ></FormField>
        <Button className="w-full bg-orange-500 hover:bg-orange-400">Next</Button>
      </form>
    </Form>
  );
};
export default ProductInfo;
