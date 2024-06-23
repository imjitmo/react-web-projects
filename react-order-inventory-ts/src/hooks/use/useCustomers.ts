import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createQrCode, getCustomers } from '../api/CustomerAPI';

export const useGetCustomers = () => {
  const { isPending, data: customersData } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return { isPending, customersData };
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
