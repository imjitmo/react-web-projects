// import { FiSearch } from 'react-icons/fi';
// import { Input } from '../ui/input';

import { useStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Cart from '../Cart/Cart';

const Header = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [timeNow, setTimeNow] = useState(new Date().toLocaleTimeString('en-US'));
  const today: string = new Date().toLocaleDateString('en-US', options);
  useEffect(() => {
    const time = setInterval(() => {
      setTimeNow(new Date().toLocaleTimeString('en-US'));
      clearInterval(time);
    }, 1000);
  }, [timeNow]);

  const { displayName } = useStore(
    useShallow((state) => ({
      displayName: state.displayName,
    }))
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <h1>Felicitas Steak House</h1>
        {/* <label className="relative flex items-center">
          <FiSearch className="absolute size-[1.25rem] left-2" />
          <Input className="pl-10 h-12 bg-slate-500/20 w-full" placeholder="Search..." />
        </label> */}
        <Cart />
      </div>

      <p>
        {today} @ {timeNow}
      </p>
      <p>Welcome, {displayName?.split(' ')[0]}!</p>
    </div>
  );
};
export default Header;
