import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { useStore } from '@/store/store';
import { useEffect } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const Layout = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === 'loading';
  const { userId } = useStore(
    useShallow((state) => ({
      userId: state.userId,
    }))
  );

  useEffect(() => {
    if (!userId) {
      navigate('/auth');
    }
  }, [userId, navigate]);

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
