import Drinks from './About/Drinks';
import Foods from './About/Foods';

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-slate-50 flex flex-col gap-10 items-center justify-center"
    >
      <Drinks />
      <Foods />
    </section>
  );
};
export default About;
