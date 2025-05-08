import { ModeToggle } from '@/layouts/ToggleButton';
import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
type HeaderProps = {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsNavOpen }: HeaderProps) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setIsNavOpen((prev) => !prev);
    setActive((prev) => !prev);
  };
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 p-2">
      <div className="flex flex-row gap-4 items-center content-center">
        <MotionConfig transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <motion.button
            initial={false}
            className="relative size-15 rounded-2xl bg-slate-950/20 transition-colors hover:bg-slate-950/40"
            onClick={handleClick}
            animate={active ? 'open' : 'closed'}
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
        <span className="grow">{location.pathname.substring(1)}</span>
        <div className="p-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
export default Header;
