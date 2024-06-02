import { Button } from '@/components/ui/button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      Page not found!
      <Button
        className="bg-orange-500 text-slate-50 rounded-full flex flex-row gap-2 items-center justify-center py-2 px-4"
        onClick={() => navigate(-1)}
      >
        Go back <IoMdArrowRoundBack />
      </Button>
    </div>
  );
};
export default Error;
