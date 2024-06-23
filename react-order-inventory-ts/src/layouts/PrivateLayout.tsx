import Error from '@/components/Error';
import { useStore } from '@/store/store';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const PrivateLayout = () => {
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'admin' || userType === 'super' ? true : false;
  return <>{checkUserType ? <Outlet /> : <Error />}</>;
};
export default PrivateLayout;
