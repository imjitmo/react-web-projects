import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createDish, getDishes } from '../api/DishAPI';

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