import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  addPointsToCustomer,
  checkExistingCustomer,
  checkPin,
  createCustomer,
  createQrCode,
  getCustomers,
  viewCustomerPoints,
} from '../api/CustomerAPI';

export const useGetCustomers = () => {
  const { isPending, data: customersData } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return { isPending, customersData };
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { mutate: registerCustomer, isPending: isCreating } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      toast.success('Customer Created!', { id: 'customers' });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'customers' });
      console.error(error.message);
    },
  });
  return { registerCustomer, isCreating };
};

export const useAddPointsToCustomer = () => {
  const queryClient = useQueryClient();
  const { mutate: addPoints, isPending: isAdding } = useMutation({
    mutationFn: addPointsToCustomer,
    onSuccess: () => {
      toast.success('Points Added!', { id: 'customers' });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'customers' });
      console.error(error.message);
    },
  });
  return { addPoints, isAdding };
};

export const useGenerateQrCode = () => {
  const { mutate: generateQrCode, isPending: isGenerating } = useMutation({
    mutationFn: createQrCode,
    onSuccess: () => {
      toast.success('QR Code Generated!', { id: 'staffs' });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'staffs' });
      console.error(error.message);
    },
  });
  return { generateQrCode, isGenerating };
};

export const useViewCustomerPoints = () => {
  const { mutate: viewPoints, isPending: isViewing } = useMutation({
    mutationFn: viewCustomerPoints,
  });
  return { viewPoints, isViewing };
};

export const useCheckExistingCustomer = () => {
  const { mutate: checkCustomer, isPending: isCheckingCustomer } = useMutation({
    mutationFn: checkExistingCustomer,
  });
  return { checkCustomer, isCheckingCustomer };
};

export const useCheckCustomerPin = () => {
  const { mutate: checkCustomerPin, isPending: isChecking } = useMutation({
    mutationFn: checkPin,
  });
  return { checkCustomerPin, isChecking };
};
