import { ImSpinner6 } from 'react-icons/im';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ImSpinner6 className="size-32 animate-spin text-slate-100" />
    </div>
  );
};
export default Loader;
