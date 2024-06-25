import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import Sidebar from './sections/MobileMenu/Sidebar';

const Header = () => {
  return (
    <nav className="flex flex-col flex-wrap items-center justify-center w-full h-auto md:py-2 md:px-6  bg-slate-50 text-slate-950 p-4 top-0 left-0 sticky z-[99]">
      <div className="flex flex-row flex-wrap items-center justify-between w-full h-auto md:py-4 md:px-8">
        <NavLink to="/">
          <img
            src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/sign/assets/felicitas_logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZmVsaWNpdGFzX2xvZ28ucG5nIiwiaWF0IjoxNzE3OTcyMzgwLCJleHAiOjE3NDk1MDgzODB9.zRedt2ULJwA-J_DJpiGlAUau7rt7bhBcy7mY3jzE0Pw&t=2024-06-09T22%3A32%3A57.545Z"
            className="size-16"
            alt=""
          />
        </NavLink>
        <ul className="hidden md:flex flex-row flex-wrap gap-4 items-center justify-evenly">
          <li className="hover:text-orange-300">
            <Link
              to="homepage"
              className="cursor-pointer "
              activeClass="text-orange-300 font-bold border-b border-orange-300"
              smooth={true}
              spy={true}
            >
              Home
            </Link>
          </li>
          <li className="hover:text-orange-300">
            <Link
              to="about"
              className="cursor-pointer "
              activeClass="text-orange-300 font-bold border-b border-orange-300"
              smooth={true}
              spy={true}
            >
              About
            </Link>
          </li>
          <li className="hover:text-orange-300">
            <Link
              to="menu"
              className="cursor-pointer "
              activeClass="text-orange-300 font-bold border-b border-orange-300"
              smooth={true}
              spy={true}
            >
              Menu
            </Link>
          </li>
          <li className="hover:text-orange-300">
            <Link
              to="services"
              className="cursor-pointer "
              activeClass="text-orange-300 font-bold border-b border-orange-300"
              smooth={true}
              spy={true}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="rewards"
              className="cursor-pointer "
              activeClass="text-orange-300 font-bold border-b border-orange-300"
              smooth={true}
              spy={true}
            >
              <Button className="bg-orange-300 rounded-lg hover:bg-green-600 hover:text-slate-50 text-slate-900">
                Rewards
              </Button>
            </Link>
          </li>
          <li>
            <NavLink to="/auth">
              <Button className="text-xs bg-red-500 rounded-lg hover:text-slate-50 text-slate-50">KDS</Button>
            </NavLink>
          </li>
        </ul>
        {/* <Button
          className="bg-transparent ring-0 hover:bg-transparent outline-none shadow-none border-none focus:border-none active:border-none focus:ring-0 focus:ring-offset-0 text-slate-950 md:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <IoClose className="size-8" /> : <IoMdMenu className="size-8" />}
        </Button> */}
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
      {/* <div
        className={` ${
          showMenu ? 'transition-all duration-500 ease-in-out min-h-[200px]' : 'min-h-none hidden'
        } text-center`}
      >
        <ul className="flex flex-col flex-wrap gap-4 justify-evenly">
          <motion.li
            variants={fadeIn('left', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Link
              to="homepage"
              className="cursor-pointer "
              activeClass="border-b border-slate-100"
              smooth={true}
              spy={true}
            >
              Home
            </Link>
          </motion.li>
          <motion.li
            variants={fadeIn('right', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
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
            variants={fadeIn('left', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
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
            variants={fadeIn('right', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Link
              to="services"
              className="cursor-pointer "
              activeClass="border-b border-slate-100"
              smooth={true}
              spy={true}
            >
              Services
            </Link>
          </motion.li>
          <motion.li
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Button className="bg-orange-300 rounded-lg hover:bg-green-600 hover:text-slate-50 text-slate-900">
              Rewards
            </Button>
          </motion.li>
        </ul>
      </div> */}
    </nav>
  );
};
export default Header;
