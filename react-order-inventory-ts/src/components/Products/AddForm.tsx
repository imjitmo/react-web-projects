import { Dish } from '@/hooks/models/Dishes';

import { useCreateDishes } from '@/hooks/use/useDishes';

import { useState } from 'react';
import AddDish from './AddDish';

const AddForm = () => {
  const { addDish, isCreating } = useCreateDishes();
  const [addSuccess, setAddSuccess] = useState(false);
  const handleSubmit = (values: Dish) => {
    setAddSuccess(false);
    addDish(values, {
      onSuccess: () => setAddSuccess(true),
    });
  };
  return (
    <>
      <AddDish handleSubmit={handleSubmit} isCreating={isCreating} addSuccess={addSuccess} />
    </>
  );
};
export default AddForm;
