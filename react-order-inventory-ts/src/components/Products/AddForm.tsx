import { Dish } from '@/hooks/models/Dishes';

import { useCreateDishes } from '@/hooks/use/useDishes';

import AddDish from './AddDish';

const AddForm = () => {
  const { addDish, isCreating } = useCreateDishes();
  const handleSubmit = (values: Dish) => {
    addDish(values);
  };
  return (
    <>
      <AddDish handleSubmit={handleSubmit} isLoading={isCreating} />
    </>
  );
};
export default AddForm;
