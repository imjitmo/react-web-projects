import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <>
      <section>
        <Outlet />
      </section>
    </>
  );
};
export default PrivateLayout;
