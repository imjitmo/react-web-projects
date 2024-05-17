import { navIn } from '@/anim/variant';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { BsBriefcase, BsChatSquareText, BsClipboardData } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-1/2 left-12 transform -translate-x-1/2 -translate-y-1/2 w-[5rem] overflow-hidden z-50">
        <div className="flex flex-row">
          <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
            {isOpen ? (
              <FaChevronLeft className="size-[1.25rem]" />
            ) : (
              <FaChevronRight className="animate-bounce size-[1.25rem]" />
            )}
          </button>
          <motion.div
            className="mx-auto flex flex-col"
            variants={navIn('right', 0.01)}
            animate={isOpen ? 'show' : 'hidden'}
          >
            <div className="w-full bg-slate-950/70 dark:bg-slate-100/20 h-[260px] backdrop-blur-2xl rounded-full max-w-[50px] mx-auto flex flex-col justify-evenly items-center text-xl gap-1 text-white/50">
              <Link
                to="/dashboard"
                className="cursor-pointer h-[30px] w-[50px] flex items-center justify-center"
              >
                <BiHomeAlt />
              </Link>
              <Link
                to="/products"
                className="cursor-pointer h-[30px] w-[50px] flex items-center justify-center"
              >
                <BiUser />
              </Link>
              <Link to="skills" className="cursor-pointer h-[30px] w-[50px] flex items-center justify-center">
                <BsClipboardData />
              </Link>
              <Link
                to="portfolio"
                className="cursor-pointer h-[30px] w-[50px] flex items-center justify-center"
              >
                <BsBriefcase />
              </Link>
              <Link
                to="contact"
                className="cursor-pointer h-[30px] w-[50px] flex items-center justify-center"
              >
                <BsChatSquareText />
              </Link>
              <Link
                to="/"
                className="cursor-pointer h-[30px] w-[50px] text-slate-100  flex items-center justify-center"
              ></Link>
            </div>
          </motion.div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
