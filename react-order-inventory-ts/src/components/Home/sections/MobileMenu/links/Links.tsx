import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';
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
          className="cursor-pointer "
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
          to="products"
          className="cursor-pointer "
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          Products
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
          to="rewards"
          className="cursor-pointer"
          activeClass="border-b border-slate-100"
          smooth={true}
          spy={true}
        >
          <Button className="bg-orange-300 rounded-lg hover:bg-green-600 hover:text-slate-50 text-slate-900">
            Rewards
          </Button>
        </Link>
      </motion.li>
    </motion.ul>
  );
};

export default Links;
