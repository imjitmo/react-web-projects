import { AiOutlinePieChart } from 'react-icons/ai';
import { BiSolidStoreAlt } from 'react-icons/bi';
import { FiBell } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoMailOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { LuBadgePercent } from 'react-icons/lu';

import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="top-0 left-0 transform-[5rem] bg-slate-950/70 dark:bg-slate-100/20 min-w-[100px] min-h-screen backdrop-blur-2xl">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center min-w-[70px] max-w-[80px] h-[100px]">
          <Link to="/dashboard" className="bg-orange-500/30 p-2 rounded-lg">
            <svg className="size-0">
              <linearGradient id="blue-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#ea580c" offset="10%" />
                <stop stopColor="#f97316" offset="100%" />
              </linearGradient>
            </svg>
            <BiSolidStoreAlt className="size-12" style={{ fill: 'url(#blue-gradient)' }} />
          </Link>
        </div>
        <div className="w-full min-w-[70px] max-w-[80px] mx-auto flex flex-col justify-evenly items-center text-xl gap-12 text-white/50">
          <NavLink
            end
            to="/dashboard"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <GoHome className="size-7" />
          </NavLink>
          <NavLink
            end
            to="/inventory"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <LuBadgePercent className="size-7" />
          </NavLink>
          <NavLink
            end
            to="/report"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <AiOutlinePieChart className="size-7" />
          </NavLink>
          <NavLink
            end
            to="/portfolio"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <IoMailOutline className="size-7" />
          </NavLink>
          <NavLink
            end
            to="/orders"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <FiBell className="size-7" />
          </NavLink>
          <NavLink
            end
            to="/setup"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <IoSettingsOutline className="size-7" />
          </NavLink>

          <NavLink
            end
            to="/logout"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <LiaSignOutAltSolid className="size-7" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
