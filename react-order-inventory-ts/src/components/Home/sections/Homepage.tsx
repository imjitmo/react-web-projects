import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const Homepage = () => {
  return (
    <section id="homepage" className="bg-slate-50 relative h-screen overflow-hidden flex flex-row">
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/leaves.png')] bg-cover bg-bottom absolute opacity-30 inset-0 z-[0]"></div>
      <motion.div
        variants={fadeIn('right', 0.3)}
        initial="hidden"
        animate={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/food_header.png?t=2024-06-10T03%3A16%3A59.684Z')] bg-cover bg-bottom absolute inset-0 z-[1] hidden md:block"
      ></motion.div>

      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        animate={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col flex-wrap gap-2 inset-0 z-[2] w-full justify-center md:justify-normal"
      >
        <h1>FELICITAS STEAKHOUSE.</h1>
        <h1 className="text-5xlz-[4] text-green-600">
          <span className="text-slate-950">Eat More.</span> Be Healthy
        </h1>
        <p>Hundreds of flavors under one roof. Once you try it, you will love it.</p>
      </motion.div>
    </section>
  );
};
export default Homepage;
