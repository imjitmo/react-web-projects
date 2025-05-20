import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  addReservation,
  addReservationExtras,
  getGuestReserveCount,
  getReservationExtras,
  getReservationInformation,
  updateBookingStatus,
  updateTrackingStatus,
  viewGuestReservations,
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

export const useGetGuestReservations = () => {
  const { mutate: viewGuestData, isPending } = useMutation({
    mutationFn: viewGuestReservations,
  });
  return { viewGuestData, isPending };
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

export const useGetGuestReserveCount = () => {
  const { mutate: isGetGuestReserveCount, isPending } = useMutation({
    mutationFn: getGuestReserveCount,
  });
  return { isGetGuestReserveCount, isPending };
};

export const useAddReservationExtras = () => {
  const queryClient = useQueryClient();
  const { mutate: createReservationExtras, isPending } = useMutation({
    mutationFn: addReservationExtras,
    onSuccess: () => {
      toast.success('Extras Added', { id: 'reservation' });
      queryClient.invalidateQueries({ queryKey: ['extras'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'reservation' });
      console.error(error.message);
    },
  });
  return { isPending, createReservationExtras };
};

export const useGetGuestExtras = () => {
  const { mutate: viewGuestExtras, isPending } = useMutation({
    mutationFn: getReservationExtras,
  });
  return { viewGuestExtras, isPending };
};
