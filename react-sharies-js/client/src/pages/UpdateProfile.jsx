import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

// profile avatar
import { Link } from 'react-router-dom';
import UserImage from '../hooks/UserImage.js';
import avatar from '/profile.png';

const UpdateProfile = () => {
  const [viewPass, setViewPass] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: user.profilePic,
    password: '',
  });

  const [updating, setUpdating] = useState(false);
  const { handleImageChange, imgUrl } = UserImage();

  const modeToggle = (e) => {
    e.target.checked ? setViewPass(true) : setViewPass(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    if (updating) return;
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, profilePic: imgUrl }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, { id: 'updateError' });
        return;
      }
      toast.success('Account Updated Successfully!', { id: 'updateSuccess' });
      setUser(data);
      localStorage.setItem('user-sharies', JSON.stringify(data));
      return;
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="gap-8 mx-auto max-w-lg py-3 px-2">
        <div className="items-center text-center pb-10">
          <h1 className="text-4xl font-bold pb-4">Update Profile</h1>
          <p className="text-lg">tired of your old profile? Update yours now! 😆</p>
        </div>
        <div className="rounded-lg bg-gray-600 shadow-lg px-5 py-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-6 w-full">
              <div>
                <img
                  src={imgUrl || user.profilePic || avatar}
                  className="w-32 h-auto rounded-lg self-center"
                  alt="avatar"
                />
              </div>

              <div className="w-full my-auto">
                <button
                  type="button"
                  className="w-full bg-gray-800 p-2 px-6 rounded-lg hover:bg-gray-900"
                  onClick={() => fileRef.current.click()}
                >
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    ref={fileRef}
                    onChange={handleImageChange}
                    hidden
                  />
                  Change Avatar
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="w-full">
                <label htmlFor="firstName" className="text-gray-300">
                  Full Name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="p-2 rounded-lg w-full"
                  name="name"
                  id="name"
                  placeholder="enter first name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="w-full">
                <label htmlFor="username" className="text-gray-300">
                  Username: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="p-2 rounded-lg w-full"
                  name="username"
                  id="username"
                  placeholder="enter username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="email" className="text-gray-300">
                Email Address: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="p-2 rounded-lg w-full"
                name="email"
                id="email"
                placeholder="enter your email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="text-gray-300">
                Bio: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 rounded-lg w-full"
                name="bio"
                id="bio"
                placeholder="enter your bio"
                onChange={handleChange}
                value={formData.bio}
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
                  placeholder="enter your password"
                  onChange={handleChange}
                  value={formData.password}
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
            <div className="w-full flex flex-col gap-4 lg:flex-row">
              <Link to={`/${user.username}`} className="w-full">
                <button
                  type="button"
                  className="p-2 rounded-lg bg-red-900 w-full uppercase font-semibold text-white order-last lg:order-first hover:bg-red-800 disabled:opacity-70"
                  disabled={updating}
                >
                  Close
                </button>
              </Link>
              <button
                type="submit"
                className="p-2 rounded-lg bg-slate-900 w-full uppercase font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
                disabled={updating}
              >
                {updating ? <span className="loading loading-dots loading-sm"></span> : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
