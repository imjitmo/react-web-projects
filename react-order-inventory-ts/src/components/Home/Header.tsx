import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between w-full py-4 px-8 bg-slate-50 text-slate-950">
      <img src="/felicitas_logo.jpg" className="size-16" alt="" />
      <ul className="flex flex-row flex-wrap gap-4 justify-evenly">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>Dish</li>
        <li>Contact</li>
        <li>Register</li>
      </ul>
    </nav>
  );
};
export default Header;
