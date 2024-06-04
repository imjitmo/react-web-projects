export interface ingredientTypes {
  id?: string;
  ingredientType: string;
  ingredientCategory: string;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
}

export type IngredientProps = {
  id?: string;
  ingredientType: string;
  ingredientCategory: string;
  ingredientInfo: string;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
};
