import Error from '@/components/Error/Error';
import { useStore } from '@/store/store';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const AdminRoute = () => {
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'admin' || userType === 'staff' ? true : false;
  return <>{checkUserType ? <Outlet /> : <Error />}</>;
};
export default AdminRoute;
