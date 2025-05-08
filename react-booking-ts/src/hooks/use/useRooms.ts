import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRoom, updateRoomStatus, viewRooms } from '../api/RoomsAPI';

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
