import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getReservationReports, getUserLogsReports } from '../api/Reports';

export const useGetReservationReports = () => {
  const queryClient = useQueryClient();
  const { mutate: isReservationReports, isPending } = useMutation({
    mutationFn: getReservationReports,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isReservationReports, isPending };
};

export const useGetUserLogsReports = () => {
  const queryClient = useQueryClient();
  const { mutate: isUseLogsReports, isPending } = useMutation({
    mutationFn: getUserLogsReports,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isUseLogsReports, isPending };
};
