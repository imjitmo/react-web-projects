import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import Links from './links/Links';

import ToggleButton from './toggleButton/ToggleButton';

const variants: Variants = {
  open: {
    clipPath: 'circle(1200px at 50px 50px)',
    transition: {
      type: 'spring',
      stiffness: 20,
    },
  },
  closed: {
    clipPath: 'circle(30px at 360px 48px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-end justify-content-center text-slate-50 bg-slate-950"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div className="fixed top-0 right-10 bottom-0 w-[400px] bg-blue-950 z-[999]" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setIsOpen={setIsOpen} />
    </motion.div>
  );
};

export default Sidebar;
