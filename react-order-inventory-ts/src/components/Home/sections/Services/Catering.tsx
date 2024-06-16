import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const Catering = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col flex-wrap overflow-hidden">
      <div className="flex flex-col gap-4 text-center items-center justify-center inset-0 z-[3] py-20 px-8">
        <motion.h1
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="uppercase"
        >
          <span className="text-green-600">WE</span> DO <span className="text-orange-300">CATERING</span>.
        </motion.h1>
        <motion.p
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
        >
          We'll bring the 'que to you! From backyard cuisine, holiday celebrations or hundred-person events,
          our catering crew and catering truck can do it all. Serving thoughtfully crafted sides, vegan and
          vegetarian options, to the BBQ classics from all the regions of Bataan — it’s all here.
        </motion.p>
      </div>
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/catering.png')] bg-cover bg-bottom opacity-80 absolute inset-0 z-[0]"></div>
    </div>
  );
};
export default Catering;
