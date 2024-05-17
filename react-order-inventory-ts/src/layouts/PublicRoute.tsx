import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PublicRouteProps = PropsWithChildren;
const PublicRoute = ({ children }: PublicRouteProps) => {
  const user: boolean = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [navigate, user]);
  return !user ? children : null;
};
export default PublicRoute;
