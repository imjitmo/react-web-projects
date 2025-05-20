import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import Modal from '@/components/UiHooks/Modal';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useUpdateUserStatus, useUserLogs } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { MdMotionPhotosPaused, MdOutlinePlayCircle } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

interface UpdateProps {
  id?: string;
  status?: boolean;
  user?: string;
}

const Update = (props: UpdateProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const { isUpdateUserStatus, isPending: isUpdating } = useUpdateUserStatus();
  const { userActionLogs } = useUserLogs();

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

  const handleClickUpdate = () => {
    isUpdateUserStatus(
      { id: props.id, status: !props.status },
      {
        onSuccess: () => {
          userActionLogs(
            {
              action: `${!props.status ? 'Enabled' : 'Disabled'} ${props.user && props.user}`,
              ...userLogData,
            },
            {
              onSuccess: () => {
                setOnOpen((prev) => !prev);
              },
            }
          );
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };
  return (
    <div>
      <Tiptools
        title={props.status ? 'Disable' : 'Enable'}
        titleClassName="text-slate-950 dark:text-slate-50"
      >
        <button onClick={() => setOnOpen((prev) => !prev)}>
          {props.status ? (
            <MdMotionPhotosPaused className="size-6" />
          ) : (
            <MdOutlinePlayCircle className="size-6" />
          )}
        </button>
      </Tiptools>
      <Modal header="Are you absolutely sure?" onOpen={onOpen} setOnOpen={setOnOpen}>
        <p>
          {props.status
            ? 'This action cannot be undone. This will deactive your target user and they will not be able to log onto their accounts.'
            : 'You are about to enable this user. It will give them the access to log onto the system and navigate onto it.'}
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
export default Update;
