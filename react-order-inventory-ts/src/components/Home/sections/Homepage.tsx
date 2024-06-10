import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const Homepage = () => {
  return (
    <section id="homepage" className="bg-slate-50 relative h-screen">
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/leaves.png')] bg-cover bg-bottom absolute opacity-30 inset-0 z-[0]"></div>
      <motion.div
        variants={fadeIn('right', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/food.png?t=2024-06-09T23%3A12%3A16.284Z')] bg-cover bg-bottom absolute inset-0 z-[1]"
      ></motion.div>
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 max-w-[300px] inset-0 z-[2]"
      >
        <h1 className="text-5xlz-[4] text-green-600">
          <span className="text-slate-950">Eat More.</span> Be Healthy
        </h1>
        <p>Hundreds of flavors under one roof. Once you try it, you will love it.</p>
      </motion.div>
    </section>
  );
};
export default Homepage;
