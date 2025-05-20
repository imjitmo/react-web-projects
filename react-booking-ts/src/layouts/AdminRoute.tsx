import { useStore } from '@/store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const AdminRoute = () => {
  const navigate = useNavigate();
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'admin' || userType === 'staff' ? true : false;
  return <>{checkUserType ? <Outlet /> : navigate('/auth')}</>;
};
export default AdminRoute;
