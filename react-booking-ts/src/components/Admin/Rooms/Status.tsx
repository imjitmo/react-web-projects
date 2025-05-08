import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useUpdateRoomStatus } from '@/hooks/use/useRooms';
import { useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { MdMotionPhotosPaused, MdOutlinePlayCircle } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

interface DeactivateProps {
  roomId: string;
  roomStatus: string;
  roomNumber: string;
  roomName: string;
}
const Status = ({ roomId, roomStatus, roomNumber, roomName }: DeactivateProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const { userActionLogs } = useUserLogs();
  const { editRoomStatus, isUpdating } = useUpdateRoomStatus();

  const { userId, email, displayName, userType } = useStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
      displayName: state.displayName,
      userType: state.userType,
    }))
  );
  const userLogData = {
    userId: userId ? userId : '',
    userEmail: email ? email : '',
    userName: displayName ? displayName : '',
    userType: userType ? userType : '',
  };

  const handleClickUpdate = async () => {
    editRoomStatus(
      { id: roomId, status: roomStatus === 'available' ? 'unavailable' : 'available' },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `Room ${roomName} - ${roomNumber} Updated to ${roomStatus}`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                setOnOpen(false);
              },
            }
          );
        },
      }
    );
  };
  return (
    <div>
      <Tiptools
        title={roomStatus === 'available' ? 'Disable' : 'Enable'}
        titleClassName="text-slate-950 dark:text-slate-50"
      >
        <button onClick={() => setOnOpen((prev) => !prev)}>
          {roomStatus === 'available' ? (
            <MdMotionPhotosPaused className="size-6" />
          ) : (
            <MdOutlinePlayCircle className="size-6" />
          )}
        </button>
      </Tiptools>
      <Modal header="Are you absolutely sure?" onOpen={onOpen} setOnOpen={setOnOpen}>
        <p>
          {roomStatus === 'available'
            ? 'This action cannot be undone. This will deactive your target room and guests will not be able to book or see this room.'
            : 'You are about to enable this room. This will automatically show on the guests panel and they will be able to view and book this room.'}
        </p>
        <div className="flex flex-row justify-end gap-4">
          <Button
            className="bg-blue-950 dark:bg-slate-800 text-slate-50"
            onClick={() => setOnOpen((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-700 text-slate-50 grow flex-1/2"
            onClick={handleClickUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? <Loading size={20} /> : 'Yes'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default Status;
