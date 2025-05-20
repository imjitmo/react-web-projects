import About from './About/About';
import Perks from './Perks/Perks';
import Rooms from './Rooms/Rooms';
import Services from './Services/Services';
import Team from './Team/Team';
import Homepage from './Top/Homepage';

const Body = () => {
  return (
    <main className="w-full min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950">
      <Homepage />
      <About />
      <Perks />
      <Rooms />
      <Services />
      <Team />
    </main>
  );
};

export default Body;
