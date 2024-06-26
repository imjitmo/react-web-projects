import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const Drinks = () => {
  return (
    <div className="w-full min-h-screen flex flex-col flex-wrap gap-10 justify-center items-center relative overflow-hidden">
      <div className="flex flex-wrap justify-center items-center gap-2 inset-0 z-[1] my-8 md:my-0">
        <motion.h1
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          A <span className="text-green-600">REFRESHING</span> <span className="text-orange-300">TREAT</span>.
        </motion.h1>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-12  inset-0 z-[1]">
        <motion.img
          variants={fadeIn('left', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/red_smoothie.jpg?t=2024-06-09T23%3A33%3A09.795Z"
          alt="smoothies"
          className="w-96 rounded-lg drop-shadow-lg shadow-slate-900"
        />
        <motion.img
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/coolers.jpg"
          alt="smoothies"
          className="w-96 rounded-lg drop-shadow-lg shadow-slate-900"
        />
      </div>
      <div className="flex flex-col justify-center items-center max-w-xl gap-2 inset-0 z-[1]">
        <motion.h1
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          A DRINK TO <span className="text-orange-300">REMEMBER</span>
        </motion.h1>
        <motion.p
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          Sip the Unseen. Drink the Possibilities. Flavorful Secrets Unveiled. Indulgence Redefined. Raise
          Your Glass, Embrace the Exceptional. Unlock Your Taste Adventure. Beyond Ordinary, Into
          Extraordinary.
        </motion.p>
      </div>
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/drop_lets.png?t=2024-06-10T03%3A23%3A51.108Z')] bg-cover bg-bottom opacity-20 absolute inset-0 z-[0]"></div>
    </div>
  );
};
export default Drinks;
