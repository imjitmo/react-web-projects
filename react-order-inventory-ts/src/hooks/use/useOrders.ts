import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  acceptItemOrder,
  acceptMainOrder,
  addToOrderList,
  cancelOrder,
  createOrder,
  updateCurrentOrder,
  updateInventoryByOrder,
  viewBestSellers,
  viewOrderByDate,
  viewOrderList,
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

export const useAcceptMainOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: approveMainOrder, isPending: isApproving } = useMutation({
    mutationFn: acceptMainOrder,
    onSuccess: () => {
      toast.success('Order successfully accepted!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isApproving, approveMainOrder };
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

export const useViewOrderList = (orderId: string) => {
  const { isPending: isLoading, data: orderList } = useQuery({
    queryKey: ['orderList'],
    queryFn: () => viewOrderList(orderId),
  });
  return { isLoading, orderList };
};

export const useAcceptOrderItem = () => {
  const queryClient = useQueryClient();
  const { mutate: acceptOrder, isPending: isAccepting } = useMutation({
    mutationFn: acceptItemOrder,
    onSuccess: () => {
      toast.success('Menu Item Updated!', { id: 'orderList' });
      queryClient.invalidateQueries({ queryKey: ['orderList'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAccepting, acceptOrder };
};

export const useUpdateInventoryByOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: updateInventoryCount, isPending: isUpdating } = useMutation({
    mutationFn: updateInventoryByOrder,
    onSuccess: () => {
      toast.success('Order item is accepted!', { id: 'orderList' });
      queryClient.invalidateQueries({ queryKey: ['orderList'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateInventoryCount };
};
