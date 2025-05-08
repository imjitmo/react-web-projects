import { useStore } from '@/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { loginUser, logoutUser, registerUser } from '../api/AuthAPI';
import { addUserLogs } from '../api/UsersAPI';

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: isLoginUser, isPending: isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });

  return { isLoginUser, isLoading };
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  const { mutate: isRegisterUser, isPending: isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });

  return { isRegisterUser, isLoading };
};

export const useUserLogs = () => {
  const queryClient = useQueryClient();

  const { mutate: userActionLogs, isPending: isLoading } = useMutation({
    mutationFn: addUserLogs,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { userActionLogs, isLoading };
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearUserLoginData } = useStore(
    useShallow((state) => ({
      clearUserLoginData: state.clearUserLoginData,
    }))
  );

  const { mutate: isLogoutUser, isPending: isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('User Successfully Logged Out!', { id: 'users' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      clearUserLoginData();
      navigate('/auth');
    },
    onError: (error) => {
      toast.error(error.message, { id: 'users' });
      console.error(error.message);
    },
  });

  return { isLogoutUser, isLoading };
};
