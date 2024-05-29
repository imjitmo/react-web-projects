import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { Outlet, useNavigation } from 'react-router-dom';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div>
      {isLoading && <div>Loading...</div>}

      <main className="min-h-screen w-full flex">
        <Navigation />
        <section className="w-full flex flex-col gap-4 p-4">
          <Header />
          <section className="w-full h-full">
            <Outlet />
          </section>
          <Footer />
        </section>
      </main>
    </div>
  );
};
export default Layout;
