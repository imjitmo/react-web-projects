import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet, useNavigation } from 'react-router-dom';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
