import DialogTool from '@/components/DialogTool';
import TooltipTool from '@/components/TooltipTool';
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
import { unit } from '@/hooks/data/selectValues';
import { useGetInventory } from '@/hooks/use/useInventory';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

import { useUpdateIngredients } from '@/hooks/use/useDishes';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const IngredientSchema = z.object({
  ingredientType: z
    .string({
      required_error: 'Type is required',
    })
    .min(1, 'Type is required'),
  dishInformation: z
    .string({
      required_error: 'Ingredient is required',
    })
    .min(1, 'Ingredient is required'),
  ingredientUnit: z
    .string({
      required_error: 'Type is required',
    })
    .min(1, 'Unit is required'),
  ingredientQuantity: z.coerce.number().min(0),
});

interface IngredientProps {
  id: string;
  dishName: string;
  dishPrice: number;
  dishImage: string;
  dishIngredients?: IngredientProps[];
  dishAvailability?: boolean;
  dishStatus?: boolean;
  dishType: string;
}

interface Ingredients {
  ingredientType: string;
  dishInformation: string;
  ingredientUnit: string;
  ingredientQuantity: number;
}

const UpdateIngredients = ({ dishData }: { dishData: IngredientProps }) => {
  const { updateIngredients, isUpdating } = useUpdateIngredients();
  const [quantity, setQuantity] = useState(0);
  const [listIngredients, setListIngredients] = useState([] as Ingredients[]);
  const { inventory } = useGetInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = searchParams.get('category');
  const inventoryRecords = inventory?.filter((item) => (filterParams ? item.itemType === filterParams : []));
  const paramValues = [...new Set(inventory?.map((items) => items.itemType))];
  const handleClick = (searchParameter: string, parameterValue: string) => {
    searchParams.set(searchParameter, parameterValue);
    setSearchParams(searchParams);
  };
  const form = useForm<z.infer<typeof IngredientSchema>>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: {
      ingredientType: filterParams ? filterParams : '',
      dishInformation: '',
      ingredientUnit: '',
      ingredientQuantity: 0,
    },
  });
  const [onOpen, setOnOpen] = useState(false);

  const handleQuantity = (type: string) => {
    type === 'add'
      ? setQuantity((quantity) => quantity + 1)
      : quantity < 1
      ? setQuantity(0)
      : setQuantity((quantity) => quantity - 1);

    form.setValue('ingredientQuantity', quantity);
  };

  const onSubmitIngredients = (data: Ingredients) => {
    setListIngredients([...listIngredients, data]);
    searchParams.delete('category');
    setSearchParams(searchParams);
    setQuantity(0);
    form.reset();
  };

  const handleCreateIngredients = () => {
    updateIngredients(
      { listIngredients, id: dishData.id },
      {
        onSuccess: () => {
          setListIngredients([]);
          form.reset();
          setOnOpen(false);
        },
      }
    );
  };

  return (
    <>
      <TooltipTool title="Add Ingredients to Dish">
        <p onClick={() => setOnOpen((prev) => !prev)}>
          <AiOutlineAppstoreAdd className="size-6 text-orange-500 cursor-pointer" />
        </p>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add Ingredients"
        description="This Ingredients will be added to your selected dish"
      >
        <h3 className="flex gap-4">
          Dish# {dishData.id.slice(0, 5)} - {dishData.dishName}
        </h3>
        {listIngredients?.length > 0 &&
          listIngredients?.map((item) => (
            <ul className="flex flex-wrap flex-row" key={item.dishInformation.split('_')[0]}>
              <li className="text-slate-50 text-sm">{`${item.ingredientQuantity} ${item.ingredientUnit} of ${
                item.dishInformation.split('_')[1]
              }`}</li>
            </ul>
          ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitIngredients)} className="flex flex-col gap-2 flex-wrap">
            <FormField
              control={form.control}
              name="ingredientType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl className="min-w-[150px]">
                    <div className="flex gap-4">
                      <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick a type" onBlur={field.onBlur} ref={field.ref} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 text-slate-50 capitalize">
                          <SelectGroup>
                            <SelectLabel>Pick Ingredient</SelectLabel>
                            {!filterParams && <> </>}
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
                        onClick={() => field?.value && handleClick('category', field.value)}
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

            <FormField
              control={form.control}
              name="dishInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient</FormLabel>
                  <FormControl>
                    <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={!filterParams ? 'Pick a type first' : 'Pick an Ingredient'}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 text-slate-50">
                        <SelectGroup>
                          <SelectLabel>
                            {!filterParams ? 'Pick a type first' : 'Pick an Ingredient'}
                          </SelectLabel>
                          {filterParams &&
                            inventoryRecords &&
                            inventoryRecords?.length > 0 &&
                            inventoryRecords?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id}_${item.itemName}_${item.itemCategory}`}
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
                    <div className="flex flex-row gap-2 justify-center">
                      <Input type="number" min={0} placeholder="quantity" {...field} />
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
              name="ingredientUnit"
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
            <div className="flex flex-wrap justify-between">
              <Button
                onClick={() => handleCreateIngredients()}
                type="button"
                className="bg-orange-500"
                disabled={listIngredients.length === 0 || isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Apply Changes'}
              </Button>
              <div className="flex gap-2">
                <Button className="bg-green-500">Add</Button>
                <Button
                  className="bg-red-500"
                  type="button"
                  onClick={() => {
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                    form.reset();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogTool>
    </>
  );
};
export default UpdateIngredients;
