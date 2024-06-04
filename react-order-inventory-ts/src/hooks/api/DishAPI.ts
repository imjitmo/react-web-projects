import { Dish } from '../models/Dishes';
import supabase, { supabaseUrl } from './supabase';

export const getDishes = async () => {
  const { data: dishesData, error } = await supabase.from('dishes').select();
  if (error) {
    console.error(error);
    throw new Error('Dishes could not be retrieved');
  }

  return dishesData;
};

export const createDish = async (dishData: Dish) => {
  const imageArr = dishData.dishImage instanceof File ? dishData.dishImage.name : undefined;
  const imageArrName = imageArr?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${Math.random().toString(36).slice(-8)}_${new Date().getTime()}_${Math.random()
    .toString(36)
    .slice(-8)}_${imageArrName}`;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/dishes/${imageName}`;

  const { data, error } = await supabase
    .from('dishes')
    .insert({ ...dishData, dishImage: imagePath })
    .select();

  if (error) {
    console.error(error);
    throw new Error('Dish could not be created');
  }

  const { error: storageError } = await supabase.storage.from('dishes').upload(imageName, dishData.dishImage);

  // Delete the dish IF there was an error uplaoding image

  if (storageError) {
    console.error(storageError);
    throw new Error('Dish image could not be uploaded and the dish was not created');
  }

  return data;
};
