import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addInventory, getInventories } from '../api/InventoryAPI';

export const useGetInventory = () => {
  const { isPending, data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventories,
  });

  return { isPending, inventory };
};

export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  const { mutate: createInventory, isPending: isCreating } = useMutation({
    mutationFn: addInventory,
    onSuccess: () => {
      toast.success('Inventory Item Created', { id: 'inventory' });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'inventory' });
      console.error(error.message);
    },
  });

  return { isCreating, createInventory };
};
