import Navigation from '@/components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <>
      <section>
        <Navigation />
        <Outlet />
      </section>
    </>
  );
};
export default PrivateLayout;
