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
import { useGetInventory } from '@/hooks/use/useInventory';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FiMinus } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

import { useUpdateIngredients } from '@/hooks/use/useDishes';
import { useCreateIngredients, useGetIngredients } from '@/hooks/use/useIngredients';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const IngredientSchema = z.object({
  ingredientType: z
    .string({
      required_error: 'Type is required',
    })
    .min(1, 'Type is required'),
  ingredientsInformation: z
    .string({
      required_error: 'Ingredient is required',
    })
    .min(1, 'Ingredient is required'),
  ingredientQuantity: z.coerce.number().nonnegative('Quantity cannot be negative'),
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
  ingredientsInformation: string;
  ingredientQuantity: number;
}

const AddIngredients = ({ dishData }: { dishData: IngredientProps }) => {
  const { createIngredients, isCreating } = useCreateIngredients();
  const { updateIngredients, isUpdating } = useUpdateIngredients();
  const { ingredientsData, isPending } = useGetIngredients();
  const [onType, setOnType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const { inventory } = useGetInventory();
  const [searchParams, setSearchParams] = useSearchParams({ category: '' });
  // const filterParams = searchParams?.get('category');
  // const inventoryRecords = inventory?.filter((item) => (filterParams ? item.itemType === filterParams : []));
  const inventoryRecords = inventory?.filter((item) => (onType ? item.itemType === onType : []));
  const paramValues = [...new Set(inventory?.map((items) => items.itemType))];
  // const handleClick = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   searchParameter: string,
  //   parameterValue: string
  // ) => {
  //   e.preventDefault();
  //   searchParams.set(searchParameter, parameterValue);
  //   setSearchParams(searchParams);
  // };
  // const form = useForm<z.infer<typeof IngredientSchema>>({
  //   resolver: zodResolver(IngredientSchema),
  //   defaultValues: {
  //     ingredientType: filterParams ? filterParams : '',
  //     ingredientsInformation: '',
  //     ingredientQuantity: 0,
  //   },
  // });
  const form = useForm<z.infer<typeof IngredientSchema>>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: {
      ingredientType: onType ? onType : '',
      ingredientsInformation: '',
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
    createIngredients(
      {
        dishId: dishData.id,
        inventoryId: data.ingredientsInformation.split('_')[0],
        ingredientName: data.ingredientsInformation.split('_')[1],
        ingredientCategory: data.ingredientsInformation.split('_')[2],
        ingredientType: data.ingredientType,
        ingredientQuantity: data.ingredientQuantity,
        ingredientUnit: data.ingredientsInformation.split('_')[3],
      },
      {
        onSuccess: () => {
          updateIngredients(
            { id: dishData.id, dishStatus: true },
            {
              onSuccess: () => {
                searchParams.delete('category');
                setSearchParams(searchParams);
                form.reset();
              },
            }
          );
        },
      }
    );
  };
  return (
    <>
      <TooltipTool title={`Add Includes to ${dishData.dishName}`}>
        <p onClick={() => setOnOpen((prev) => !prev)}>
          <AiOutlineAppstoreAdd className="size-6 text-orange-500 cursor-pointer" />
        </p>
      </TooltipTool>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Add Includes"
        description="This Includes will be added to your selected dish and count as inventory item"
      >
        <h3 className="flex gap-4">
          Dish# {dishData.id.slice(0, 5)} - {dishData.dishName}
        </h3>
        {isPending && 'Loading Includes...'}
        {ingredientsData && ingredientsData.length > 0 && (
          <ul>
            {ingredientsData
              ?.filter((item) => item.dishId === dishData.id)
              .map((item) => (
                <li
                  key={item.id}
                >{`${item.ingredientQuantity} ${item.ingredientUnit} of ${item.ingredientName}`}</li>
              ))}
          </ul>
        )}

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
                            <SelectLabel>Pick Includes</SelectLabel>
                            {/* {!filterParams && <> </>} */}
                            {!onType && <> </>}
                            {paramValues.map((item) => (
                              <SelectItem className="capitalize" key={item} value={item}>
                                {item.slice(0, 1).toUpperCase() + item.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {!onType && (
                        <Button
                          type="button"
                          onClick={() => field?.value && setOnType(field.value)}
                          className="bg-orange-500 text-sm"
                        >
                          Apply
                        </Button>
                      )}
                      {/* <Button
                        type="button"
                        onClick={(e) => field?.value && handleClick(e, 'category', field.value)}
                        className="bg-orange-500 text-sm"
                      >
                        Apply
                      </Button> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredientsInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Includes</FormLabel>
                  <FormControl>
                    <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                      <SelectTrigger>
                        {/* <SelectValue
                          placeholder={!filterParams ? 'Pick a type first' : 'Pick an Ingredient'}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        /> */}
                        <SelectValue
                          placeholder={!onType ? 'Pick a type first' : 'Pick an Ingredient'}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 text-slate-50">
                        <SelectGroup>
                          {/* <SelectLabel>
                            {!filterParams ? 'Pick a type first' : 'Pick an Ingredient'}
                          </SelectLabel> */}
                          <SelectLabel>{!onType ? 'Pick a type first' : 'Pick an Ingredient'}</SelectLabel>
                          {/* {filterParams &&
                            inventoryRecords &&
                            inventoryRecords?.length > 0 &&
                            inventoryRecords?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id}_${item.itemName}_${item.itemCategory}_${item.itemUnit}`}
                              >
                                {item.itemName}/
                                <span className="font-bold italic text-green-500">({item.itemUnit})</span>
                              </SelectItem>
                            ))} */}
                          {onType &&
                            inventoryRecords &&
                            inventoryRecords?.length > 0 &&
                            inventoryRecords?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id}_${item.itemName}_${item.itemCategory}_${item.itemUnit}`}
                              >
                                {item.itemName}/
                                <span className="font-bold italic text-green-500">({item.itemUnit})</span>
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

            {/* <FormField
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
            /> */}
            <div className="flex flex-wrap flex-row justify-end gap-2">
              <Button className="bg-orange-500" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Adding...' : 'Add'}
              </Button>
              {/* <Button
                className="bg-red-500"
                type="button"
                onClick={() => {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                  form.reset();
                }}
              >
                Reset
              </Button> */}
              <Button
                className="bg-red-500"
                type="button"
                onClick={() => {
                  setOnType('');
                  form.reset();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </DialogTool>
    </>
  );
};
export default AddIngredients;
