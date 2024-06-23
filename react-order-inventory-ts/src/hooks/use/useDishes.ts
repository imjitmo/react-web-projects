import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createDish,
  deleteDish,
  editDish,
  getDishes,
  getRandomDish,
  updateDish,
  updateDishImage,
} from '../api/DishAPI';

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

export const useUpdateDishImage = () => {
  const queryClient = useQueryClient();

  const { mutate: editDishImage, isPending: isUpdating } = useMutation({
    mutationFn: updateDishImage,
    onSuccess: () => {
      toast.success('Dish Updated', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
    },
  });

  return { isUpdating, editDishImage };
};

export const useDeleteDish = () => {
  const queryClient = useQueryClient();
  const { mutate: removeDish, isPending: isDeleting } = useMutation({
    mutationFn: deleteDish,
    onSuccess: () => {
      toast.success('Menu Item Removed', { id: 'dishes' });
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'dishes' });
      console.error(error.message);
    },
  });
  return { isDeleting, removeDish };
};

export const useGetRandomMenu = () => {
  const { isPending: isLoading, data: menuData } = useQuery({
    queryKey: ['menu'],
    queryFn: getRandomDish,
  });
  return { isLoading, menuData };
};
