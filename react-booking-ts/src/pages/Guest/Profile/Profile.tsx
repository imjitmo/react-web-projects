import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import ProfileCards from './Cards/ProfileCards';

const Profile = () => {
  const { userId } = useStore(
    useShallow((state) => ({
      userId: state.userId,
    }))
  );
  return (
    <div className="flex flex-wrap p-8 items-center content-center-safe justify-between gap-4">
      <ProfileCards id={userId ? userId : ''} />
    </div>
  );
};
export default Profile;
