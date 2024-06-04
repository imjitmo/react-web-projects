import { IngredientProps } from './Ingredients';

export interface Dish {
  id?: string;
  dishName: string;
  dishPrice: number;
  dishImage: string;
  dishIngredients?: IngredientProps[];
}
