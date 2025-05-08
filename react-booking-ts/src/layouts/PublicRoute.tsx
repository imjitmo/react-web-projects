import Error from '@/components/Error/Error';
import { Outlet } from 'react-router-dom';

// const PublicRoute = () => {
//   const user: boolean = false;
//   return user ? <Error /> : <Outlet />;
// };
// type PublicRouteProps = PropsWithChildren;
// const PublicRoute = ({ children }: PublicRouteProps) => {
const PublicRoute = () => {
  const user: boolean = false;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) navigate('/', { replace: true });
  // }, [navigate, user]);
  return !user ? <Outlet /> : <Error />;
};
export default PublicRoute;
