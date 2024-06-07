import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createDish, editDish, getDishes, updateDish } from '../api/DishAPI';

export const useGetDishes = () => {
  const { isPending, data: dishesData } = useQuery({
    queryKey: ['dishes'],
    queryFn: getDishes,
  });

  return { isPending, dishesData };
};

export const useCreateDishes = () => {
  const queryClient = useQueryClient();

  const { mutate: addDish, isPending: isCreating } = useMutation({
    mutationFn: createDish,
    onSuccess: () => {
      toast.success('Dish Created', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
      console.error(error.message);
    },
  });

  return { isCreating, addDish };
};

export const useUpdateIngredients = () => {
  const queryClient = useQueryClient();

  const { mutate: updateIngredients, isPending: isUpdating } = useMutation({
    mutationFn: updateDish,
    onSuccess: () => {
      toast.success('Dish Updated', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
      console.error(error.message);
    },
  });
  return { isUpdating, updateIngredients };
};

export const useUpdateDish = () => {
  const queryClient = useQueryClient();

  const { mutate: updateDish, isPending: isUpdating } = useMutation({
    mutationFn: editDish,
    onSuccess: () => {
      toast.success('Dish Updated', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
      console.error(error.message);
    },
  });
  return { isUpdating, updateDish };
};
