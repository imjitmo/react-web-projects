import { Dish } from '@/hooks/models/Dishes';

import { useCreateDishes } from '@/hooks/use/useDishes';

import { useState } from 'react';
import AddDish from './AddDish';

const AddForm = () => {
  const [onReset, setOnReset] = useState(false);
  const { addDish, isCreating } = useCreateDishes();
  const handleSubmit = (values: Dish) => {
    setOnReset(false);
    addDish(values, {
      onSuccess: () => {
        setOnReset(true);
      },
    });
  };
  return (
    <>
      <AddDish handleSubmit={handleSubmit} isLoading={isCreating} onReset={onReset} />
    </>
  );
};
export default AddForm;
