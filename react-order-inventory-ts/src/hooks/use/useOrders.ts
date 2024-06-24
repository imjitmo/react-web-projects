import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  addToOrderList,
  cancelOrder,
  createOrder,
  updateCurrentOrder,
  viewBestSellers,
  viewOrderByDate,
  viewOrders,
} from '../api/OrderAPI';

export const useGetBestSellers = () => {
  const { isPending: isLoading, data: bestSellers } = useQuery({
    queryKey: ['bestSellers'],
    queryFn: viewBestSellers,
  });
  return { isLoading, bestSellers };
};

export const useGetOrders = () => {
  const { isPending: isLoading, data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: viewOrders,
  });
  return { isLoading, orders };
};

export const useGetOrderByDate = (startDate: Date, endDate: Date) => {
  const { isPending: isLoading, data: orders } = useQuery({
    queryKey: ['orders', startDate, endDate],
    queryFn: () => viewOrderByDate(startDate, endDate),
  });
  return { isLoading, orders };
};

export const useCreateOrderNumber = () => {
  const queryClient = useQueryClient();
  const { mutate: createOrderNumber, isPending: isCreating } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('Order successfully created!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createOrderNumber };
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: cancelOrderNumber, isPending: isCancelling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success('Order successfully cancelled!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCancelling, cancelOrderNumber };
};

export const useUpdateCurrentOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: updateOrder, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentOrder,
    onSuccess: () => {
      toast.success('Order successfully uploaded!', { id: 'orders' });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateOrder };
};

export const useAddToOrderList = () => {
  const queryClient = useQueryClient();
  const { mutate: addToListOfOrders, isPending: isAdding } = useMutation({
    mutationFn: addToOrderList,
    onSuccess: () => {
      toast.success('Order successfully uploaded!', { id: 'orders' });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, addToListOfOrders };
};
