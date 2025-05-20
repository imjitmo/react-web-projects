import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

const variants: Variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};
const Links = () => {
  return (
    <motion.ul
      className="absolute flex flex-col items-center justify-center gap-4 w-full h-full"
      variants={variants}
    >
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="homepage"
          className="cursor-pointer"
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Home
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="about"
          className="cursor-pointer"
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          About
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="perks"
          className="cursor-pointer "
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Perks
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="rooms"
          className="cursor-pointer "
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Rooms
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="services"
          className="cursor-pointer"
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Services
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to="team"
          className="cursor-pointer"
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Team
        </Link>
      </motion.li>
      <motion.li
        className="text-2xl font-medium hover:text-orange-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <NavLink to="/auth">
          <Button className="bg-yellow-300 rounded-lg hover:bg-blue-600 hover:text-slate-50 text-slate-900">
            Login
          </Button>
        </NavLink>
      </motion.li>
    </motion.ul>
  );
};

export default Links;
