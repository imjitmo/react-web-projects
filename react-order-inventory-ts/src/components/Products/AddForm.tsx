import { Dish } from '@/hooks/models/Dishes';

import { useCreateDishes } from '@/hooks/use/useDishes';

import { useStore } from '@/store/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import AddDish from './AddDish';

const AddForm = () => {
  const { displayName } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
    }))
  );
  const [onReset, setOnReset] = useState(false);
  const { addDish, isCreating } = useCreateDishes();
  const handleSubmit = (values: Dish) => {
    setOnReset(false);
    addDish(
      { ...values, addedBy: displayName },
      {
        onSuccess: () => {
          setOnReset(true);
        },
      }
    );
  };
  return (
    <>
      <AddDish handleSubmit={handleSubmit} isLoading={isCreating} onReset={onReset} />
    </>
  );
};
export default AddForm;
