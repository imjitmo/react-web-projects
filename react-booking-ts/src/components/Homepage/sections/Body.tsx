import Perks from './Perks/Perks';
import Homepage from './Top/Homepage';

const Body = () => {
  return (
    <main className="w-full min-h-screen bg-slate-200 text-slate-950">
      <Homepage />
      <Perks />
    </main>
  );
};

export default Body;
