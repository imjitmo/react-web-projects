import { addIngredients, getIngredients, removeIngredients } from '@/hooks/api/IngredientsAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetIngredients = () => {
  const { isPending, data: ingredientsData } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });

  return { isPending, ingredientsData };
};

export const useCreateIngredients = () => {
  const queryClient = useQueryClient();

  const { mutate: createIngredients, isPending: isCreating } = useMutation({
    mutationFn: addIngredients,
    onSuccess: () => {
      toast.success('Ingredient Added', { id: 'ingredients' });
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'ingredients' });
      console.error(error.message);
    },
  });

  return { isCreating, createIngredients };
};

export const useRemoveIngredients = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteIngredients, isPending: isRemoving } = useMutation({
    mutationFn: removeIngredients,
    onSuccess: () => {
      toast.success('Menu Item Removed', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
      console.error(error.message);
    },
  });

  return { isRemoving, deleteIngredients };
};
