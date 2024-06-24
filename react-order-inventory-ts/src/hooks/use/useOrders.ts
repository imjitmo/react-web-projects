import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { cancelOrder, createOrder, viewBestSellers, viewOrderByDate, viewOrders } from '../api/OrderAPI';

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
