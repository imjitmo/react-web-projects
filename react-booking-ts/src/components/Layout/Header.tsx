import { ModeToggle } from '@/layouts/ToggleButton';
import { motion, MotionConfig } from 'framer-motion';
type HeaderProps = {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = (props: HeaderProps) => {
  const handleClick = () => {
    props.setIsNavOpen((prev) => !prev);
    props.setActive((prev) => !prev);
  };

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 p-2">
      <div className="flex flex-row gap-4 items-center content-center">
        <MotionConfig transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <motion.button
            initial={false}
            className="relative size-15 rounded-2xl bg-slate-950/20 transition-colors hover:bg-slate-950/40"
            onClick={handleClick}
            animate={props.active ? 'open' : 'closed'}
          >
            <motion.span
              style={{
                left: '50%',
                top: '35%',
                translate: '-50% -50%',
              }}
              className="absolute h-1 w-6 bg-slate-950 dark:bg-slate-50"
              variants={{
                open: {
                  rotate: ['45deg', '0deg', '0deg'],
                  top: ['50%', '50%', '35%'],
                },
                closed: {
                  rotate: ['0deg', '0deg', '45deg'],
                  top: ['35%', '50%', '50%'],
                },
              }}
            />
            <motion.span
              style={{
                left: '50%',
                top: '50%',
                translate: '-50% -50%',
              }}
              className="absolute h-1 w-6 bg-slate-950 dark:bg-slate-50"
              variants={{
                open: {
                  rotate: ['-45deg', '0deg', '0deg'],
                },
                closed: {
                  rotate: ['0deg', '0deg', '-45deg'],
                },
              }}
            />
            <motion.span
              style={{
                left: '50%',
                bottom: '35%',
                translate: '-50% 50%',
              }}
              className="absolute h-1 w-6 bg-slate-950 dark:bg-slate-50"
              variants={{
                open: {
                  rotate: ['45deg', '0deg', '0deg'],
                  left: '50%',
                },
                closed: {
                  rotate: ['0deg', '0deg', '45deg'],
                  left: '50%',
                  bottom: ['35%', '50%', '50%'],
                },
              }}
            />
          </motion.button>
        </MotionConfig>
        <span className="grow">
          {location.pathname.substring(1) === 'profile' && <h1 className="text-2xl font-bold">My Profile</h1>}
          {location.pathname.substring(1) === 'reservation' && (
            <h1 className="text-2xl font-bold">My Reservations</h1>
          )}
          {location.pathname.substring(1) === 'room' && <h1 className="text-2xl font-bold">Room List</h1>}
          {location.pathname.substring(1) === 'dashboard' && (
            <h1 className="text-2xl font-bold">Dashboard</h1>
          )}
          {location.pathname.substring(1).includes('modules') && (
            <h1 className="text-2xl font-bold">Training Modules</h1>
          )}
          {location.pathname.substring(1) === 'reservations' && (
            <h1 className="text-2xl font-bold">Guest Reservations</h1>
          )}
          {location.pathname.substring(1) === 'rooms' && (
            <h1 className="text-2xl font-bold">Room Management</h1>
          )}
          {location.pathname.substring(1) === 'accounts' && (
            <h1 className="text-2xl font-bold">Account Management</h1>
          )}
          {location.pathname.substring(1) === 'scan' && (
            <h1 className="text-2xl font-bold">QR Code Scanner and Viewer</h1>
          )}
          {location.pathname.substring(1) === 'reports' && <h1 className="text-2xl font-bold">Reports</h1>}
        </span>
        <div className="p-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
export default Header;
