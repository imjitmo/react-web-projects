import About from './sections/About';
import Homepage from './sections/Homepage';

const Body = () => {
  return (
    <main className="w-full min-h-screen bg-slate-200 text-slate-950">
      <Homepage />
      <About />
    </main>
  );
};
export default Body;
