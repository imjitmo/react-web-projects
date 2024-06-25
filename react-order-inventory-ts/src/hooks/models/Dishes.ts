export interface Dish {
  id?: string;
  dishName: string;
  dishDescription?: string;
  dishPrice: number;
  dishImage: File | string;
  dishAvailability?: boolean;
  dishStatus?: boolean;
  dishType: string;
  imageLink?: string;
  addedBy?: string | null;
  updatedBy?: string | null;
}

export interface DishUpdate {
  id?: string;
  dishStatus?: boolean;
}

export interface DishesModel {
  id?: string;
  dishStatus?: boolean;
}

export interface EditDish {
  id?: string;
  dishName?: string;
  dishDescription?: string;
  dishPrice?: number;
  dishType?: string;
  dishAvailability?: boolean;
  updatedBy?: string | null;
}

export interface DeleteDish {
  id: string;
  dishName: string;
}
