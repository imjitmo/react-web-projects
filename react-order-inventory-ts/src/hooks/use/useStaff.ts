import { useStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { listUsers, loginUser, logoutUser, registerUser, updateUserStatus } from '../api/AuthAPI';

export const useGetStaffs = () => {
  const { isPending, data: staffsData } = useQuery({
    queryKey: ['staffs'],
    queryFn: listUsers,
  });

  return { isPending, staffsData };
};

export const useStaffLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginStaff, isPending: isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('User Successfully Logged In!', { id: 'staffs' });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message, { id: 'staffs' });
      console.error(error.message);
    },
  });

  return { loginStaff, isLoading };
};

export const useStaffLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearUserLoginData } = useStore(
    useShallow((state) => ({
      clearUserLoginData: state.clearUserLoginData,
    }))
  );

  const { mutate: logoutStaff, isPending: isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('User Successfully Logged Out!', { id: 'staffs' });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      clearUserLoginData();
      navigate('/auth');
    },
    onError: (error) => {
      toast.error(error.message, { id: 'staffs' });
      console.error(error.message);
    },
  });

  return { logoutStaff, isLoading };
};

export const useRegisterStaff = () => {
  const queryClient = useQueryClient();

  const { mutate: addUser, isPending: isCreating } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('User Created', { id: 'staffs' });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'staffs' });
      console.error(error.message);
    },
  });

  return { addUser, isCreating };
};

export const useUpdateStaffStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: updateStaffStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      toast.success('User Status Updated!', { id: 'staffs' });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'staffs' });
      console.error(error.message);
    },
  });

  return { updateStaffStatus, isUpdating };
};
