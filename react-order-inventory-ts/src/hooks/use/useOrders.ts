import { useQuery } from '@tanstack/react-query';
import { viewBestSellers, viewOrderByDate, viewOrders } from '../api/OrderAPI';

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
