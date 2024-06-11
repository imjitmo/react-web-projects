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
    clipPath: 'circle(30px at 325px 50px)',
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
      className="flex flex-col items-center justify-end justify-content-center text-slate-950 bg-slate-950"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div className="fixed top-0 left-0 bottom-0 w-[400px] bg-slate-50 z-[999]" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setIsOpen={setIsOpen} />
    </motion.div>
  );
};

export default Sidebar;
