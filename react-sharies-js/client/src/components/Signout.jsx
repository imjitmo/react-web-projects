import toast from 'react-hot-toast';
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.js';

const Signout = () => {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      const res = await fetch(`api/users/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, { id: 'signOutError' });
        return;
      }
      toast.success('Signed Out Successfully!', { id: 'signOutSuccess' });
      localStorage.removeItem('user-sharies');
      setUser(null);
      navigate('/');
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    }
  };
  return (
    <div className="fixed bottom-8 left-8 flex flex-row gap-4" title="Sign Out">
      <button type="button" onClick={handleSignout}>
        <IoMdLogOut className="w-8 h-auto hover:opacity-80" />
      </button>
    </div>
  );
};

export default Signout;
