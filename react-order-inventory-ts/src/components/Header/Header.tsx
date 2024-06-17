// import { FiSearch } from 'react-icons/fi';
// import { Input } from '../ui/input';

import Cart from '../Cart/Cart';

const Header = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const today: string = new Date().toLocaleDateString('en-US', options);
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

      <p>{today}</p>
    </div>
  );
};
export default Header;
