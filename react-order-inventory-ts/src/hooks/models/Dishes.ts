export interface Dish {
  id?: string;
  dishName: string;
  dishPrice: number;
  dishImage: File | string;
  dishAvailability?: boolean;
  dishStatus?: boolean;
  dishType: string;
}

export interface DishesModel {
  id?: string;
  dishName: string;
  dishDescription: string;
  dishPrice: number;
  dishImage: File | string;
  dishType: string;
}
