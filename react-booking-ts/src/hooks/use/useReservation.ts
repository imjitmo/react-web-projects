import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addReservation } from '../api/ReserveAPI';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  const { mutate: addNewReservation, isPending: isCreating } = useMutation({
    mutationFn: addReservation,
    onSuccess: () => {
      toast.success('Reservation Added', { id: 'reservation' });
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'reservation' });
      console.error(error.message);
    },
  });

  return { addNewReservation, isCreating };
};
