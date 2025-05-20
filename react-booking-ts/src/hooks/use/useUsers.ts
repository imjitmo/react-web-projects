import { useStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { loginUser, logoutUser, registerUser } from '../api/AuthAPI';
import {
  addUserLogs,
  checkUserProfile,
  getAllGuest,
  getAllUserLogs,
  getAllUsers,
  getGuestInformation,
  getSingleUser,
  updateGuestInformation,
  updateUserImage,
  updateUserSignature,
  updateUserStatus,
} from '../api/UsersAPI';

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
      toast.success('Registration Successful', { id: 'users' });
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
      toast.success('You have logged out successfully!', { id: 'users' });
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

export const useGetAllUsers = () => {
  const { data: userData, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });

  return { userData, isPending };
};

export const useGetAllGuest = () => {
  const { data: guestData, isPending } = useQuery({
    queryKey: ['guests'],
    queryFn: () => getAllGuest(),
  });

  return { guestData, isPending };
};

export const useGetSingleUser = () => {
  const { mutate: userData, isPending: isLoading } = useMutation({
    mutationFn: getSingleUser,
  });

  return { userData, isLoading };
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();
  const { mutate: isUpdateUserImage, isPending: isUpdating } = useMutation({
    mutationFn: updateUserImage,
    onSuccess: (userData) => {
      toast.success('Image Updated', { id: 'users' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isUpdateUserImage, isUpdating };
};

export const useUpdateUserSignature = () => {
  const { mutate: isUpdateUserSignature, isPending: isUpdating } = useMutation({
    mutationFn: updateUserSignature,
    onSuccess: (userData) => {
      toast.success('Signature Updated', { id: 'users' });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isUpdateUserSignature, isUpdating };
};

export const useCheckUserProfile = () => {
  const { mutate: isCheckUserProfile, isPending: isLoading } = useMutation({
    mutationFn: checkUserProfile,
    onSuccess: (userData) => {
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isCheckUserProfile, isLoading };
};

export const useUpdateGuestInformation = () => {
  const { mutate: isUpdateGuestInformation, isPending: isUpdating } = useMutation({
    mutationFn: updateGuestInformation,
    onSuccess: (userData) => {
      toast.success('Information Updated', { id: 'users' });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isUpdateGuestInformation, isUpdating };
};

export const useGetGuestInformation = () => {
  const { mutate: viewGuestInformation, isPending: isViewing } = useMutation({
    mutationFn: getGuestInformation,
  });
  return { viewGuestInformation, isViewing };
};

export const useGetAllUserLogs = () => {
  const { data: isAllUserLogs, isPending } = useQuery({
    queryKey: ['logs'],
    queryFn: () => getAllUserLogs(),
  });
  return { isAllUserLogs, isPending };
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: isUpdateUserStatus, isPending } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User Updated', { id: 'users' });
      return userData;
    },
    onError: (error) => {
      throw error;
    },
  });
  return { isUpdateUserStatus, isPending };
};
