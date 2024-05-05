import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark');

  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const modeToggle = (e) => {
    e.target.checked ? setTheme('garden') : setTheme('dark');
  };
  return (
    <div className="flex flex-row justify-between items-center mt-1 mb-8 lg:mt-6 lg:mb-12">
      <div className="w-8 h-auto">
        {currentUser && (
          <Link to="/">
            <AiOutlineHome className="w-8 h-auto hover:opacity-80" />
          </Link>
        )}
      </div>

      <div className="w-8 h-auto">
        <label className="swap swap-flip text-9xl">
          <input type="checkbox" onChange={modeToggle} checked={theme === 'garden'} />
          <img className="w-8 h-auto cursor-pointer swap-on" alt="logo" src="/dark-logo.svg" />
          <img className="w-8 h-auto cursor-pointer swap-off" alt="logo" src="/light-logo.svg" />
        </label>
      </div>

      <div className="w-8 h-auto">
        {currentUser && (
          <Link to={`/${currentUser.username}`}>
            <CgProfile className="w-8 h-auto hover:opacity-80" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
