import { useStore } from '@/store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const GuestRoute = () => {
  const navigate = useNavigate();
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'guest' ? true : false;
  return <>{checkUserType ? <Outlet /> : navigate('/auth')}</>;
};
export default GuestRoute;
