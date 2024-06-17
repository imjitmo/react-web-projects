import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../api/CustomerAPI';

export const useGetCustomers = () => {
  const { isPending, data: customersData } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return { isPending, customersData };
};
