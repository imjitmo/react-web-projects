import supabase from './supabase';

interface IngredientTypes {
  dishId?: string;
  inventoryId?: string;
  ingredientName: string;
  ingredientType: string;
  ingredientCategory: string;
  ingredientQuantity: number;
  ingredientUnit: string;
}

export const getIngredients = async () => {
  const { data: ingredientsData, error } = await supabase.from('ingredients').select('*');
  if (error) {
    console.error(error);
    throw new Error('Ingredients could not be retrieved');
  }
  return ingredientsData;
};

export const addIngredients = async (data: IngredientTypes) => {
  const { data: ingredientData, error } = await supabase.from('ingredients').insert(data);

  if (error) {
    console.error(error);
    throw new Error('Inventory could not be created');
  }

  return ingredientData;
};

export const removeIngredients = async (dishId: string) => {
  const { error } = await supabase.from('ingredients').delete().eq('id', dishId);
  if (error) {
    console.error(error);
    throw new Error('Includes could not be removed');
  }
  return;
};
