import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddMain from './AddIngredients';
import Ingredients from './Ingredients';

export interface ingredientTypes {
  name: string;
  quantity: number;
  unit: string;
}

const AddForm = () => {
  const [listMain, setListMain] = useState({} as ingredientTypes);
  const [mainIngredients, setMainIngredients] = useState([] as ingredientTypes[]);
  const [listSub, setListSub] = useState({} as ingredientTypes);
  const [subIngredients, setSubIngredients] = useState([] as ingredientTypes[]);
  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      dishName: '',
      description: '',
      price: 0,
      image: '',
      mainIngredients: [] as ingredientTypes[],
      subIngredients: [] as ingredientTypes[],
    },
  });
  const handleSubmit = () => {
    form.setValue('mainIngredients', mainIngredients);
    form.setValue('subIngredients', subIngredients);
    console.log(form.getValues());
  };

  const handleMainIngredient = () => {
    setMainIngredients([...mainIngredients, listMain]);
    setListMain({} as ingredientTypes);
    console.log(mainIngredients);
  };

  const handleSubIngredient = () => {
    setSubIngredients([...subIngredients, listSub]);
    setListSub({} as ingredientTypes);
    console.log(mainIngredients);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 text-slate-50">
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
          name="description"
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
          name="price"
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
          name="image"
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
        <Ingredients
          opener={mainOpen}
          setOpener={setMainOpen}
          render={mainIngredients}
          title={'Main Ingredients'}
        >
          {mainOpen && (
            <AddMain
              listIngredients={listMain}
              setListIngredients={setListMain}
              handleIngredient={handleMainIngredient}
              title="Add Main Ingredients"
            />
          )}
        </Ingredients>
        <Ingredients
          opener={subOpen}
          setOpener={setSubOpen}
          render={subIngredients}
          title={'Sub Ingredients'}
        >
          {subOpen && (
            <AddMain
              listIngredients={listSub}
              setListIngredients={setListSub}
              handleIngredient={handleSubIngredient}
              title="Add Sub Ingredients"
            />
          )}
        </Ingredients>
        <Button className="w-full bg-orange-500 hover:bg-orange-400">Add Dish</Button>
      </form>
    </Form>
  );
};
export default AddForm;
