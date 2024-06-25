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
import { Dish } from '@/hooks/models/Dishes';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const DishSchema = z.object({
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
  dishImage: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  dishType: z.string({ required_error: 'Dish Type is required' }).min(1, 'Dish Type is required'),
});

interface AddDishProps {
  handleSubmit: (value: Dish) => void;
  isLoading?: boolean;
  dishData?: Dish;
  onReset?: boolean;
}

const AddDish = ({ handleSubmit, isLoading, dishData, onReset }: AddDishProps) => {
  const form = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      dishName: dishData?.dishName || '',
      dishDescription: dishData?.dishDescription || '',
      dishPrice: dishData?.dishPrice || 0,
      dishImage: undefined,
      dishType: dishData?.dishType || '',
    },
    reValidateMode: 'onSubmit',
  });
  useEffect(() => {
    if (onReset) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReset]);
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
        />
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
          {isLoading ? 'Adding...' : 'Add Dish'}
        </Button>
      </form>
    </Form>
  );
};
export default AddDish;
