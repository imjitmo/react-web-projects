import { useState } from 'react';

import { Dish } from '@/hooks/models/Dishes';
import { IngredientProps } from '@/hooks/models/Ingredients';
import { useCreateDishes } from '@/hooks/use/useDishes';

import AddIngredients from './AddIngredients';
import ProductInfo from './ProductInfo';

const AddForm = () => {
  const { addDish, isCreating } = useCreateDishes();
  const [onNext, setOnNext] = useState(false);
  const [dishData, setDishData] = useState({} as Dish);
  const handleSubmit = (values: Dish) => {
    setDishData(values);
    setOnNext((prev) => !prev);
  };
  const handleIngredientSubmit = (value: IngredientProps[]) => {
    setDishData({ ...dishData, dishIngredients: value });
  };

  const handleCreateDish = () => {
    addDish(dishData, {
      onSuccess: () => {
        setDishData({} as Dish);
        setOnNext((prev) => !prev);
      },
    });
  };
  return (
    <>
      {!onNext ? (
        <ProductInfo handleSubmit={handleSubmit} />
      ) : (
        <AddIngredients
          handleIngredientSubmit={handleIngredientSubmit}
          handleCreateDish={handleCreateDish}
          title={'Add Ingredients'}
          setOnNext={setOnNext}
          isCreating={isCreating}
        />
      )}
    </>
  );
};
export default AddForm;
