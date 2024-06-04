import { IngredientProps } from './Ingredients';

export interface Dish {
  id?: string;
  dishName: string;
  dishPrice: number;
  dishImage: File | string;
  dishIngredients?: IngredientProps[];
  dishAvailability?: boolean;
  dishStatus?: boolean;
}
