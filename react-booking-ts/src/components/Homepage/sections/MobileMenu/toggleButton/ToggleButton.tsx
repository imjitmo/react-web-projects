import { motion } from 'framer-motion';
import React from 'react';

interface ShowSidebarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToggleButton = ({ setIsOpen }: ShowSidebarProps) => {
  return (
    <button
      className="fixed top-[26px] right-0 bg-transparent border-none outline-none size-[50px] rounded-[50%] z-[999]"
      onClick={() => setIsOpen((prev: boolean) => !prev)}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{ closed: { d: 'M 2 2.5 L 20 2.5' }, open: { d: 'M 3 16.5 L 17 2.5' } }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{ closed: { d: 'M 2 16.346 L 20 16.346' }, open: { d: 'M 3 2.5 L 17 16.346' } }}
        />
      </svg>
    </button>
  );
};

export default ToggleButton;
