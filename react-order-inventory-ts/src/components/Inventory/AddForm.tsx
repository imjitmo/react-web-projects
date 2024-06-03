import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { category, type, unit } from '@/hooks/data/selectValues';
import { Inventory } from '@/hooks/models/Inventory';
import { useCreateInventory, useUpdateInventory } from '@/hooks/use/useInventory';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMinus } from 'react-icons/fi';
import { ImSpinner6 } from 'react-icons/im';
import { IoMdAdd } from 'react-icons/io';

interface AddFormProps {
  data?: Inventory;
}

const AddForm = ({ data }: AddFormProps) => {
  const form = useForm({
    defaultValues: {
      itemName: data ? data?.itemName : '',
      itemCategory: data ? data?.itemCategory : '',
      itemType: data ? data?.itemType : '',
      itemQuantity: data ? data?.itemQuantity : 1,
      itemUnit: data ? data?.itemUnit : '',
    },
  });

  const { createInventory, isCreating } = useCreateInventory();
  const { updatingInventory, isUpdating } = useUpdateInventory();

  const [quantity, setQuantity] = useState(data ? data?.itemQuantity : 1);

  const handleQuantity = (type: string) => {
    type === 'add'
      ? setQuantity((quantity) => quantity + 1)
      : quantity <= 1
      ? setQuantity(1)
      : setQuantity((quantity) => quantity - 1);

    form.setValue('itemQuantity', quantity);
  };

  const handleSubmit = () => {
    const inventoryData = form.getValues();
    if (data) {
      updatingInventory(
        { ...inventoryData, id: data.id },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } else {
      createInventory(inventoryData, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
    return;
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="itemName"
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
          name="itemCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a category" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    {category.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a type" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    {type.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemQuantity"
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
          name="itemUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a unit" onBlur={field.onBlur} ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 text-slate-50">
                    {unit.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-orange-500 text-slate-50 rounded-xl flex flex-row gap-2 items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ImSpinner6 className="animate-spin text-slate-100" /> {data ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              {data ? (
                'Update Item'
              ) : (
                <>
                  <IoMdAdd /> Item
                </>
              )}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default AddForm;
