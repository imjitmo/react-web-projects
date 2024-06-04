import { Button } from '@/components/ui/button';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IngredientProps } from '@/hooks/models/Ingredients';

import { useGetInventory } from '@/hooks/use/useInventory';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

interface AddMainProps {
  handleIngredientSubmit: (value: IngredientProps[]) => void;
  title: string;
  setOnNext?: (value: boolean) => void;
  handleCreateDish: () => void;
  isCreating: boolean;
}

const AddIngredients = ({ handleIngredientSubmit, title, handleCreateDish, isCreating }: AddMainProps) => {
  const [showForm, setShowForm] = useState(false);
  const form = useForm({
    defaultValues: {
      id: '',
      ingredientType: '',
      ingredientCategory: '',
      ingredientInfo: '',
      ingredientName: '',
      ingredientQuantity: '',
      ingredientUnit: '',
    },
    reValidateMode: 'onSubmit',
  });
  const { inventory } = useGetInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = searchParams.get('type');
  const inventoryRecords = inventory?.filter((item) => (filterParams ? item.itemType === filterParams : []));
  const paramValues = [...new Set(inventory?.map((items) => items.itemType))];
  const handleClick = (searchParameter: string, parameterValue: string) => {
    searchParams.set(searchParameter, parameterValue);
    setSearchParams(searchParams);
    setShowForm(true);
  };

  const [onApply, setOnApply] = useState(false);
  const [ingredientList, setIngredientList] = useState([] as IngredientProps[]);
  const handleSubmit = () => {
    const ingredientInfo = form.getValues('ingredientInfo').split('_');
    form.setValue('id', ingredientInfo[0]);
    form.setValue('ingredientName', ingredientInfo[1]);
    form.setValue('ingredientCategory', ingredientInfo[2]);
    form.setValue('ingredientUnit', ingredientInfo[3]);
    setIngredientList([...ingredientList, form.getValues()] as IngredientProps[]);
    form.reset();
    setShowForm(false);
  };

  const handleIngredients = () => {
    handleIngredientSubmit(ingredientList);
    toast.success('Changes saved, you can now add the dish.', { id: 'dishes' });
    setOnApply(true);
  };
  return (
    <>
      <h2>{title}</h2>
      {ingredientList?.length > 0 &&
        ingredientList?.map((item) => (
          <ul className="flex flex-wrap" key={item.id}>
            <li className="text-slate-50 text-sm">{`${item.ingredientQuantity} ${item.ingredientUnit} of ${item.ingredientName}`}</li>
          </ul>
        ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateDish)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="ingredientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a type" onBlur={field.onBlur} ref={field.ref} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 text-slate-50 capitalize">
                        <SelectGroup>
                          <SelectLabel>Pick Ingredient</SelectLabel>
                          {paramValues.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={() => field?.value && handleClick('type', field.value)}
                      className="bg-orange-500 text-sm"
                    >
                      Apply
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showForm && (
            <>
              <FormField
                control={form.control}
                name="ingredientInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredient</FormLabel>
                    <FormControl>
                      <Select value={field.value} name={field.name} onValueChange={field.onChange} required>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={!filterParams ? 'Pick a type first' : 'Pick an Ingredient'}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 text-slate-50">
                          <SelectGroup>
                            <SelectLabel>Pick Ingredient</SelectLabel>
                            {filterParams &&
                              inventoryRecords &&
                              inventoryRecords?.length > 0 &&
                              inventoryRecords?.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={`${item.id}_${item.itemName}_${item.itemCategory}_${item.itemUnit}`}
                                >
                                  {item.itemName}
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

              <FormField
                control={form.control}
                name="ingredientQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ingredient quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-green-500" type="button" onClick={handleSubmit}>
                Add
              </Button>
            </>
          )}
          {ingredientList?.length > 0 && (
            <div className="flex flex-row flex-wrap justify-end gap-4">
              <Button type="button" onClick={handleIngredients} className="bg-green-500">
                Apply
              </Button>
              <Button className="bg-orange-500" disabled={!onApply}>
                {isCreating ? 'Adding...' : 'Add Now'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default AddIngredients;
