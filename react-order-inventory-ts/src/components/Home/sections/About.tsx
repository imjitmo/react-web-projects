import Drinks from './About/Drinks';
import Foods from './About/Foods';

const About = () => {
  return (
    <section id="about" className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <Drinks />
      <Foods />
    </section>
  );
};
export default About;
