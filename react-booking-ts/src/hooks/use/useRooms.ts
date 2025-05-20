import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createRoom,
  getRandomRooms,
  updateRoomImage,
  updateRoomInformation,
  updateRoomStatus,
  viewAvailableRooms,
  viewRooms,
  viewSingleRoomInformation,
} from '../api/RoomsAPI';

export const useCreateRooms = () => {
  const queryClient = useQueryClient();

  const { mutate: addRoom, isPending: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success('Room Created', { id: 'rooms' });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'rooms' });
      console.error(error.message);
    },
  });

  return { addRoom, isCreating };
};

export const useViewRooms = () => {
  const { data: roomData, isPending } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => viewRooms(),
  });

  return { roomData, isPending };
};

export const useViewAvailableRooms = () => {
  const { data: roomAvailableData, isPending } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => viewAvailableRooms(),
  });

  return { roomAvailableData, isPending };
};

export const useUpdateRoomInformation = () => {
  const queryClient = useQueryClient();

  const { mutate: editRoom, isPending: isUpdating } = useMutation({
    mutationFn: updateRoomInformation,
    onSuccess: () => {
      toast.success('Room Updated', { id: 'rooms' });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'rooms' });
      console.error(error.message);
    },
  });
  return { isUpdating, editRoom };
};

export const useUpdateRoomImage = () => {
  const queryClient = useQueryClient();

  const { mutate: editRoomImage, isPending: isUpdating } = useMutation({
    mutationFn: updateRoomImage,
    onSuccess: () => {
      toast.success('Room Updated', { id: 'rooms' });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'rooms' });
      console.error(error.message);
    },
  });
  return { isUpdating, editRoomImage };
};

export const useUpdateRoomStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: editRoomStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateRoomStatus,
    onSuccess: () => {
      toast.success('Room Updated', { id: 'rooms' });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'rooms' });
      console.error(error.message);
    },
  });
  return { isUpdating, editRoomStatus };
};

export const useViewSingleRoomInformation = () => {
  const { mutate: viewSingleRoom, isPending: isViewing } = useMutation({
    mutationFn: viewSingleRoomInformation,
  });
  return { viewSingleRoom, isViewing };
};

export const useGetRandomRooms = () => {
  const { data: randRooms, isPending } = useQuery({
    queryKey: ['randomRooms'],
    queryFn: () => getRandomRooms(),
  });

  return { randRooms, isPending };
};
