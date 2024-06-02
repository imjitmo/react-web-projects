import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';

const AddForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      quantity: 1,
      unit: '',
    },
  });
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: string) => {
    type === 'add'
      ? setQuantity((quantity) => quantity + 1)
      : quantity <= 1
      ? setQuantity(1)
      : setQuantity((quantity) => quantity - 1);

    form.setValue('quantity', quantity);
  };

  const handleSubmit = () => {
    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a category" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    <SelectItem value="main">Main Ingredient</SelectItem>
                    <SelectItem value="sub">Sub Ingredient</SelectItem>
                    <SelectItem value="condements">Condements</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-2 justify-center">
                  <Input type="number" placeholder="quantity" {...field} />
                  <Button type="button" onClick={() => handleQuantity('sub')}>
                    <FiMinus />
                  </Button>
                  <Button type="button" onClick={() => handleQuantity('add')}>
                    <IoMdAdd />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a unit" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="g">Gram</SelectItem>
                    <SelectItem value="mg">Milligram</SelectItem>
                    <SelectItem value="li">Liter</SelectItem>
                    <SelectItem value="ml">Milliliter</SelectItem>
                    <SelectItem value="pc/s">Piece/s</SelectItem>
                    <SelectItem value="slc/s">Slice/s</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-orange-500 text-slate-50 rounded-xl flex flex-row gap-2 items-center justify-center">
          <IoMdAdd /> Item
        </Button>
      </form>
    </Form>
  );
};
export default AddForm;
