import { Dish } from '../models/Dishes';
import supabase from './supabase';

export const getDishes = async () => {
  const { data: dishesData, error } = await supabase.from('dishes').select();
  if (error) {
    console.error(error);
    throw new Error('Dishes could not be retrieved');
  }

  return dishesData;
};

export const createDish = async (data: Dish) => {
  console.log(data);
  const { data: dishData, error } = await supabase.from('dishes').insert(data);

  if (error) {
    console.error(error);
    throw new Error('Dish could not be created');
  }

  return dishData;
};
