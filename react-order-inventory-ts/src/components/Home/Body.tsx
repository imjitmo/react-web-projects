import About from './sections/About/About';
import FooterSection from './sections/FooterSection';
import Homepage from './sections/Homepage';
import QrPage from './sections/Rewards/QrPage';
import Services from './sections/Services/Services';

const Body = () => {
  return (
    <main className="w-full min-h-screen bg-slate-200 text-slate-950">
      <Homepage />
      <About />
      <Services />
      <QrPage />
      <FooterSection />
    </main>
  );
};
export default Body;
