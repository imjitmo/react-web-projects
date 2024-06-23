import { Dish, DishUpdate, EditDish } from '../models/Dishes';
import supabase, { supabaseUrl } from './supabase';

export const getDishes = async () => {
  const { data: dishesData, error } = await supabase
    .from('dishes')
    .select(`*, ingredients(*)`)
    .order('dishStatus', { ascending: false });
  if (error) {
    console.error(error);
    throw new Error('Dishes could not be retrieved');
  }

  return dishesData;
};

export const createDish = async (dishData: Dish) => {
  const imageArr = dishData.dishImage instanceof File ? dishData.dishImage.name : undefined;
  const imageArrName = imageArr?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random().toString(36).slice(-8)}_${imageArrName}`;
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
  if (storageError) {
    console.error(storageError);
    throw new Error('Dish image could not be uploaded and the dish was not created');
  }
  return data;
};

export const updateDish = async (dishData: DishUpdate) => {
  const { data, error } = await supabase.from('dishes').update(dishData).eq('id', dishData.id);
  if (error) {
    console.error(error);
    throw new Error('Dish could not be updated');
  }
  return data;
};

export const editDish = async (dishData: EditDish) => {
  console.log(dishData);
  const { data, error } = await supabase.from('dishes').update(dishData).eq('id', dishData.id);
  if (error) {
    console.error(error);
    throw new Error('Dish ingredients could not be updated');
  }

  return data;
};

interface DishImage {
  id: string;
  dishImage: File;
}

export const updateDishImage = async (dishData: DishImage) => {
  console.log(dishData);
  const imageArr = dishData.dishImage instanceof File ? dishData.dishImage.name : undefined;
  const imageArrName = imageArr?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random().toString(36).slice(-8)}_${imageArrName}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/dishes/${imageName}`;
  const { data, error } = await supabase
    .from('dishes')
    .update({ ...dishData, dishImage: imagePath })
    .eq('id', dishData.id)
    .select();
  if (error) {
    console.error(error);
    throw new Error('Dish Image could not be updated');
  }
  const { error: storageError } = await supabase.storage.from('dishes').upload(imageName, dishData.dishImage);
  if (storageError) {
    console.error(storageError);
    throw new Error('Dish image could not be uploaded and the dish was not created');
  }

  return data;
};

export const deleteDish = async (id: string) => {
  const { data, error } = await supabase.from('dishes').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Dish could not be deleted');
  }
  return data;
};
