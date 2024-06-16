import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const DineIn = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/veggie_meat.png?t=2024-06-16T04%3A47%3A43.366Z')] bg-cover bg-bottom opacity-10 absolute inset-0 z-[0]"></div>
      <span className="flex flex-col flex-wrap gap-4 items-center justify-center text-center p-8 z-1">
        <motion.h1
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="uppercase"
        >
          <span className="text-green-600">Dine</span> <span className="text-orange-300">In</span> WITH US.
        </motion.h1>
        <motion.span
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          <p>
            We’re crafting different cuisine made in-house (always). Get traditions and favorites from all
            over the world — all on one plate. Felecistas Steakhouse is a High-Quality Gourmand place serving
            up thebest blend of the classic Philippine traditions you’d find at the most elite cookout and the
            elevated flavors you’d find at a true fine dining spot
          </p>
          <p>
            Everything we serve is house-made and prepared by a staff that cares. You could spend a lifetime
            sampling every flavor combination at Felecitas Steakhouse, and we hope you do.
          </p>
        </motion.span>
      </span>
      <motion.img
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/dinein_img.png?t=2024-06-16T04%3A38%3A48.978Z"
        className="size-[55rem] object-contain hidden md:block z-1"
        alt="dinein_img"
      />
    </div>
  );
};
export default DineIn;
