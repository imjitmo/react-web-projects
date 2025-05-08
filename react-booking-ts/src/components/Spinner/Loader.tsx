import { CgSpinner } from 'react-icons/cg';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <CgSpinner className={`size-32 animate-spin text-blue-950 dark:text-slate-50`} />
    </div>
  );
};
export default Loader;
