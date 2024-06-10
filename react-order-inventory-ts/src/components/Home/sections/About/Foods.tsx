import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const Foods = () => {
  return (
    <div className="w-full min-h-screen flex flex-col flex-wrap gap-10 justify-center items-center relative">
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/full_page_leaves.png')] bg-cover bg-bottom opacity-20 absolute inset-0 z-[0]"></div>
      <motion.div
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/upper_left_dish.png?t=2024-06-10T00%3A02%3A19.146Z')] bg-cover bg-bottom absolute inset-0 z-[1]"
      ></motion.div>
      <motion.div
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/top_center_dish.png?t=2024-06-10T00%3A02%3A56.655Z')] bg-cover bg-bottom absolute inset-0 z-[1]"
      ></motion.div>
      <motion.div
        variants={fadeIn('down', 0.7)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/upper_right_dish.png?t=2024-06-10T00%3A03%3A12.817Z')] bg-cover bg-bottom absolute inset-0 z-[1]"
      ></motion.div>
      <motion.div
        variants={fadeIn('up', 0.9)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/bottom_center_dish.png?t=2024-06-10T00%3A03%3A37.949Z')] bg-cover bg-bottom absolute inset-0 z-[0]"
      ></motion.div>
      <motion.div
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col w-full items-center justify-center max-w-[600px] text-center inset-0 z-[2]"
      >
        <h1 className="uppercase">
          <span className="text-green-600">Nourishing</span> your{' '}
          <span className="text-orange-300">body</span>, <span className="text-green-600">delighting</span>{' '}
          your <span className="text-orange-300">soul</span>
        </h1>
        <p>
          Fresh flavors for a healthier you. Where taste meets wellness. Serving health, one plate at a time.
          Elevating your dining experience, naturally. Indulge guilt-free, dine with us. A treat for your
          taste buds, a boost for your health
        </p>
      </motion.div>
    </div>
  );
};
export default Foods;
