import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dishType } from '@/hooks/data/selectValues';
import { Dish, EditDish as EditModel } from '@/hooks/models/Dishes';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const DishSchema = z.object({
  id: z.string(),
  dishName: z
    .string({
      required_error: 'Dish Name is required',
    })
    .min(1, 'Dish Name is required'),
  dishDescription: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
  dishPrice: z.coerce.number().min(0),
  dishType: z.string({ required_error: 'Dish Type is required' }).min(1, 'Dish Type is required'),
});

interface AddDishProps {
  handleSubmit: (value: EditModel) => void;
  isLoading?: boolean;
  dishData?: Dish;
}

const EditDish = ({ handleSubmit, isLoading, dishData }: AddDishProps) => {
  const form = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      id: dishData?.id || '',
      dishName: dishData?.dishName || '',
      dishDescription: dishData?.dishDescription || '',
      dishPrice: dishData?.dishPrice || 0,
      dishType: dishData?.dishType || '',
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
          name="dishType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a type" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      {dishType.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-orange-500 hover:bg-orange-400" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Dish'}
        </Button>
      </form>
    </Form>
  );
};
export default EditDish;
