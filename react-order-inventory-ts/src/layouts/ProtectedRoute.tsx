import Error from '@/components/Error';
import { Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const user: boolean = false;

//   return !user ? <Error /> : <Outlet />;
// };
// type ProtectedRouteProps = PropsWithChildren;
// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
const ProtectedRoute = () => {
  const user: boolean = false;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) navigate('/', { replace: true });
  // }, [navigate, user]);

  return user ? <Outlet /> : <Error />;
};
export default ProtectedRoute;
