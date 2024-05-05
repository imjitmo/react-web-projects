import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom.js';

const SigninCard = () => {
  const [viewPass, setViewPass] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const modeToggle = (e) => {
    e.target.checked ? setViewPass(true) : setViewPass(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, { id: 'signInError' });
        return;
      }
      toast.success('Login Successfully!', { id: 'signInSuccess' });
      localStorage.setItem('user-sharies', JSON.stringify(data));
      setUser(data);
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="gap-8 py-3 px-2">
        <div className="items-center text-center pb-10">
          <h1 className="text-4xl font-bold pb-4">Sign In</h1>
          <p className="text-lg">to enjoy Sharies awesome features. 😁</p>
        </div>
        <div className="rounded-lg bg-gray-600 shadow-lg px-5 py-7 w-96 md:w-[24rem] lg:w-[30rem]">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="w-full">
              <label htmlFor="email" className="text-gray-300">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 rounded-lg w-full"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="enter your username"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="text-gray-300">
                Password <span className="text-red-500">*</span>
              </label>
              <label className="input-group">
                <input
                  type={viewPass ? 'text' : 'password'}
                  className="p-2 rounded-lg w-full"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="enter your password"
                  required
                />
                <label className="swap swap-rotate bg-gray-800">
                  <input type="checkbox" onChange={modeToggle} checked={viewPass} />

                  <span className="swap-off w-auto bg-transparent">
                    <AiFillEye className="text-gray-400 w-auto h-6" />
                  </span>

                  <span className="swap-on w-auto bg-transparent">
                    <AiFillEyeInvisible className="text-gray-400 w-auto h-6" />
                  </span>
                </label>
              </label>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="p-2 rounded-lg bg-slate-900 w-full uppercase font-semibold text-white hover:bg-slate-800"
                disabled={loading}
              >
                {loading ? <span className="loading loading-dots loading-sm"></span> : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="w-full h-px bg-gray-400 opacity-60 my-4"></div>
          <div className="w-full">
            <p className="text-center text-gray-300">
              Not a user?{' '}
              <span
                className="text-blue-300 cursor-pointer hover:text-blue-500"
                onClick={() => setAuthScreen('signup')}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninCard;
