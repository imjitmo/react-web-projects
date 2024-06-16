import Catering from './Catering';
import DineIn from './DineIn';

const Services = () => {
  return (
    <section id="services" className="w-full min-h-screen bg-slate-50 text-slate-950">
      <DineIn />
      <Catering />
    </section>
  );
};
export default Services;
