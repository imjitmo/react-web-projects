import Error from '@/components/Error/Error';
import { useStore } from '@/store/store';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const GuestRoute = () => {
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'guest' ? true : false;
  return <>{checkUserType ? <Outlet /> : <Error />}</>;
};
export default GuestRoute;
