import { navIn } from '@/anim/variant';
import { Button } from '@/components/ui/button';
import { useUserLogout } from '@/hooks/use/useUsers';
import { useStore } from '@/store/store';
import { motion } from 'framer-motion';
import { LucideNotebookPen } from 'lucide-react';
import { useState } from 'react';
import { FaAddressBook, FaBed, FaCalendarAlt, FaChartPie, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';
import { IoQrCodeSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { DateTimeFormatter } from '../UiHooks/Formatter';
import Modal from '../UiHooks/Modal';

const Navigation = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const [onLogout, setOnLogout] = useState(false);
  const { displayName, userType, photo } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
      userType: state.userType,
      photo: state.photo,
    }))
  );
  const pathname = location.pathname.substring(1);
  const userRestriction = userType === 'admin' || userType === 'staff' ? true : false;

  const { isLogoutUser } = useUserLogout();

  const handleLogout = async () => {
    isLogoutUser();
  };
  return (
    <motion.nav
      variants={navIn('right', 0.05)}
      animate={isNavOpen ? 'show' : 'hidden'}
      className={` ${
        isNavOpen ? '' : 'hidden'
      } sticky top-0 left-0 shrink-0 bg-blue-950 min-w-[280px] max-w-[280px] min-h-screen backdrop-blur-2xl py-4 flex flex-col gap-2 text-slate-50`}
    >
      <ul className="flex grow flex-col items-start justify-start gap-6 pl-6">
        <li className="flex flex-row gap-2 cursor-pointer">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="size-10 rounded-4xl"
              alt=""
            />
          </div>
          <h1 className="text-yellow-400 font-bold text-2xl">SOFTNET Hotel</h1>
        </li>
        <li className="pb-4 flex flex-col gap-1">
          <p className="text-md">Welcome back, {displayName}!</p>
          <span className="text-sm italic text-slate-300">{DateTimeFormatter(new Date())}</span>
        </li>
        <ul className="flex flex-col gap-4 w-[250px]">
          <li>
            <NavLink
              to={userRestriction ? '/dashboard' : '/profile'}
              className={`flex flex-row items-center gap-3 cursor-pointer ${
                pathname === 'dashboard' ? 'sidebar-active' : ''
              } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
            >
              <FaChartPie className="size-6" /> {userRestriction ? 'Dashboard' : 'Profile'}
            </NavLink>
          </li>
          {userRestriction && (
            <li>
              <NavLink
                to="/modules"
                className={`flex flex-row items-center gap-3 cursor-pointer ${
                  pathname === 'modules' || pathname.includes('module') ? 'sidebar-active' : ''
                } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
              >
                <LucideNotebookPen className="size-6" /> <span>Training Modules</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to={userRestriction ? '/reservations' : '/reservation'}
              className={`flex flex-row items-center gap-3 cursor-pointer ${
                pathname === 'reservations' ? 'sidebar-active' : ''
              } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
            >
              <FaCalendarAlt className="size-6" /> <span>Reservations</span>
            </NavLink>
          </li>
          {userRestriction && (
            <li>
              <NavLink
                to="/guests"
                className={`flex flex-row items-center gap-3 cursor-pointer ${
                  pathname === 'guests' ? 'sidebar-active' : ''
                } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
              >
                <FaAddressBook className="size-6" /> <span>Guest Management</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to={userRestriction ? '/rooms' : '/room'}
              className={`flex flex-row items-center gap-3 cursor-pointer ${
                pathname === 'rooms' ? 'sidebar-active' : ''
              } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
            >
              <FaBed className="size-6" /> {userRestriction ? 'Room Management' : 'Rooms'}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accounts"
              className={`flex flex-row items-center gap-3 cursor-pointer ${
                pathname === 'accounts' ? 'sidebar-active' : ''
              } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
            >
              <FaUsersCog className="size-6" /> Account Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/scan"
              className={`flex flex-row items-center gap-3 cursor-pointer ${
                pathname === 'scan' ? 'sidebar-active' : ''
              } hover:bg-yellow-400 hover:text-slate-950 hover:font-bold p-4 rounded-xl`}
            >
              <IoQrCodeSharp className="size-6" /> Scan
            </NavLink>
          </li>
        </ul>
      </ul>
      <div className="flex flex-row items-center justify-center content-center place-content-center border-t-slate-500 border-t pt-2 px-2 gap-4">
        <div className="cursor-pointer rounded-4xl border-2 border-solid border-yellow-400">
          <img src={photo ? photo : ''} className="size-8 rounded-4xl" alt="" />
        </div>
        <div className="flex flex-col cursor-pointer grow">
          <p>{displayName}</p>
          <p className="capitalize text-slate-400 text-sm">{userType}</p>
        </div>
        <div className="items-end">
          <Button
            type="button"
            className="cursor-pointer bg-transparent hover:bg-transparent text-slate-50 hover:text-yellow-400"
            onClick={() => setOnLogout((prev) => !prev)}
          >
            <FaSignOutAlt className="size-6" />
          </Button>
        </div>
        <Modal
          header={'Logout'}
          description="Are you sure you want to logout"
          onOpen={onLogout}
          setOnOpen={setOnLogout}
        >
          <div className="flex flex-row flex-wrap gap-4">
            <Button className="grow cursor-pointer" variant={'destructive'} onClick={handleLogout}>
              Yes
            </Button>
            <Button
              className="bg-slate-500 cursor-pointer text-center w-24"
              onClick={() => setOnLogout((prev) => !prev)}
            >
              No
            </Button>
          </div>
        </Modal>
      </div>
    </motion.nav>
  );
};
export default Navigation;
