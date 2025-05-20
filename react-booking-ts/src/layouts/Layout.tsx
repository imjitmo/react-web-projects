import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Navigation from '@/components/Layout/Navigation';
import { useStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

interface ShowSidebarProps {
  isNavOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === 'loading';
  const { userId } = useStore(
    useShallow((state) => ({
      userId: state.userId,
    }))
  );

  const [isNavOpen, setIsNavOpen] = useState<ShowSidebarProps['isNavOpen']>(true);
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (!userId) {
      navigate('/auth');
    }
  }, [userId, navigate]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      <main className="min-h-screen w-full flex flex-row">
        <div className={`w-[350px] ${active ? '' : 'hidden'}`}>
          <Navigation isNavOpen={isNavOpen} />
        </div>
        <section className="w-full flex flex-col">
          <Header setIsNavOpen={setIsNavOpen} active={active} setActive={setActive} />
          <section className="w-full grow">
            <Outlet />
          </section>
          <Footer />
        </section>
      </main>
    </div>
  );
};
export default Layout;
