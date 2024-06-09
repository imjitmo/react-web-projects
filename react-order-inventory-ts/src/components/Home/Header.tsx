import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between w-full py-4 px-8 bg-slate-50 text-slate-950">
      <img
        src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/sign/assets/felicitas_logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZmVsaWNpdGFzX2xvZ28ucG5nIiwiaWF0IjoxNzE3OTcyMzgwLCJleHAiOjE3NDk1MDgzODB9.zRedt2ULJwA-J_DJpiGlAUau7rt7bhBcy7mY3jzE0Pw&t=2024-06-09T22%3A32%3A57.545Z"
        className="size-16"
        alt=""
      />
      <ul className="flex flex-row flex-wrap gap-4 justify-evenly items-center">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>Dish</li>
        <li>Contact</li>
        <li>
          <Button className="bg-orange-300 rounded-lg text-slate-900">Rewards</Button>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
