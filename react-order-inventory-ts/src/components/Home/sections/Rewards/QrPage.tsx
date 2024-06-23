import { fadeIn, fadeTransition } from '@/anim/variant';
import { motion } from 'framer-motion';
import Generator from './Generator';
import Scanner from './Scanner';

const QrPage = () => {
  return (
    <section
      id="rewards"
      className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 relative"
    >
      <div className="flex flex-col items-center justify-center gap-4 z-[5]">
        <motion.h1
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="uppercase my-4"
        >
          We got you <span className="text-orange-300">COVERED</span> with our{' '}
          <span className="text-green-500">REWARDS</span> system.
        </motion.h1>
        <Generator />
        <motion.p
          variants={fadeTransition(0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm font-semibold"
        >
          or
        </motion.p>
        <Scanner />

        <motion.p
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm font-semibold my-4"
        >
          Enjoy amazing discounts using our points system. In each order, you can earn points.
        </motion.p>
      </div>
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/rewards.png?t=2024-06-23T05%3A58%3A49.815Z')] bg-cover bg-bottom opacity-[0.1] absolute inset-0 z-[0]"></div>
    </section>
  );
};
export default QrPage;
