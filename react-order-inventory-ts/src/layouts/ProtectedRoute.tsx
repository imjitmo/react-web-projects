import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user: boolean = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/', { replace: true });
  }, [navigate, user]);
  return user ? children : null;
};
export default ProtectedRoute;
