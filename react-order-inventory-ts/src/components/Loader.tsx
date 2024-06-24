import { ImSpinner6 } from 'react-icons/im';

const Loader = () => {
  const pathname = window.location.pathname;
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        pathname === '/' ? 'bg-slate-50' : 'bg-slate-950'
      }`}
    >
      <ImSpinner6
        className={`size-32 animate-spin ${pathname === '/' ? 'text-slate-950' : 'text-slate-50'}`}
      />
    </div>
  );
};
export default Loader;
