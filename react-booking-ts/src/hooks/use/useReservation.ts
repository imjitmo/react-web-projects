import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  addReservation,
  getReservationInformation,
  updateBookingStatus,
  updateTrackingStatus,
  viewReservations,
} from '../api/ReserveAPI';

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

export const useGetReservation = () => {
  const { data: reservationData, isPending } = useQuery({
    queryKey: ['reservation'],
    queryFn: () => viewReservations(),
  });

  return { reservationData, isPending };
};

export const useViewCustomerReservation = () => {
  const { mutate: viewReservation, isPending: isViewing } = useMutation({
    mutationFn: getReservationInformation,
  });
  return { viewReservation, isViewing };
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: editReservationStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateTrackingStatus,
    onSuccess: () => {
      toast.success('Reservation Updated', { id: 'reservation' });
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'reservation' });
      console.error(error.message);
    },
  });
  return { isUpdating, editReservationStatus };
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: editBookingStatus, isPending: isLoading } = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () => {
      toast.success('Reservation Updated', { id: 'reservation' });
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'reservation' });
      console.error(error.message);
    },
  });
  return { isLoading, editBookingStatus };
};
