import { GoHome } from 'react-icons/go';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { LiaUsersCogSolid } from 'react-icons/lia';
import { MdOutlineInventory } from 'react-icons/md';
import { PiCookingPotBold, PiSignOutBold } from 'react-icons/pi';
import { TbRowInsertTop } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { useStaffLogout } from '@/hooks/use/useStaff';

import { useStore } from '@/store/store';
import { Link, NavLink } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const Navigation = () => {
  const { logoutStaff } = useStaffLogout();
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );
  const checkUserType = userType === 'admin' || userType === 'super' ? true : false;
  const notForKitchenAndCashier =
    userType !== 'chef' && userType !== 'cook' && userType !== 'cashier' ? true : false;
  const notForWaiterAndCashier = userType !== 'waiter' && userType !== 'cashier' ? true : false;
  const handleLogout = async () => {
    logoutStaff();
  };
  return (
    <nav className="top-0 left-0 transform-[5rem] bg-slate-950/70 dark:bg-slate-100/20 min-w-[100px] min-h-screen backdrop-blur-2xl">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center min-w-[70px] max-w-[80px] h-[100px]">
          <Link to="/dashboard" className="p-2">
            {/* <svg className="size-0">
              <linearGradient id="blue-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#ea580c" offset="10%" />
                <stop stopColor="#f97316" offset="100%" />
              </linearGradient>
            </svg>
            <BiSolidStoreAlt className="size-12" style={{ fill: 'url(#blue-gradient)' }} /> */}
            <img
              src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/felicitas_logo.jpg"
              alt="felicitas_logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>
        <div className="w-full min-w-[50px] max-w-[50px] mx-auto flex flex-col justify-evenly items-center text-xl gap-8 text-white/50">
          <NavLink
            end
            to="/dashboard"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <GoHome className="size-7" />
          </NavLink>
          {notForKitchenAndCashier && (
            <>
              <NavLink
                end
                to="/order"
                className={({ isActive }) =>
                  `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
                }
              >
                <IoRestaurantOutline className="size-7" />
              </NavLink>
              {notForWaiterAndCashier && (
                <NavLink
                  end
                  to="/setup"
                  className={({ isActive }) =>
                    `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
                  }
                >
                  <TbRowInsertTop className="size-7" />
                </NavLink>
              )}
            </>
          )}
          <NavLink
            end
            to="/cook"
            className={({ isActive }) =>
              `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
            }
          >
            <PiCookingPotBold className="size-7" />
          </NavLink>
          {notForWaiterAndCashier && (
            <NavLink
              end
              to="/inventory"
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
              }
            >
              <MdOutlineInventory className="size-7" />
            </NavLink>
          )}
          {notForKitchenAndCashier && (
            <NavLink
              end
              to="/customers"
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
              }
            >
              <HiOutlineUserGroup className="size-7" />
            </NavLink>
          )}
          {checkUserType && (
            <NavLink
              end
              to="/users"
              className={({ isActive }) =>
                `p-4 rounded-lg ${isActive ? 'bg-orange-500 text-slate-50' : 'text-orange-500'}`
              }
            >
              <LiaUsersCogSolid className="size-7" />
            </NavLink>
          )}
          <Button
            className="p-4 bg-transparent hover:bg-transparent rounded-lg text-orange-500"
            onClick={() => handleLogout()}
          >
            <PiSignOutBold className="size-7" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
