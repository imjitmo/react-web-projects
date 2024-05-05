import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { RiEditCircleLine } from 'react-icons/ri';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import avatar from '/profile.png';

const UserHeader = ({ user }) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(user.followers.includes(currentUser._id));
  const [updating, setUpdating] = useState(false);

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success('url copied to clipboard', { id: 'clipboard' });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      toast.error('please login to continue', { id: 'logError' });
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, { id: 'regError' });
        return;
      }
      toast.success(data.message, { id: 'folunfState' });
      following ? user.followers.pop() : user.followers.push(currentUser._id);
      setFollowing(!following);
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row w-full justify-between">
        <div>
          <h1 className="text-2xl font-bold my-2 capitalize cursor-default">{user.name}</h1>
          <div className="flex gap-2 items-center">
            <p className="font-sm cursor-default">{user.username}</p>
            <span className="box"></span>
            <p className="font-xs text-gray-400 bg-gray-700 px-2 rounded-full cursor-default">sharies.net</p>
          </div>
        </div>
        <div>
          <img
            className="h-10 w-10 lg:h-24 lg:w-24 object-contain rounded-full"
            name={user.username}
            src={user.profilePic ? user.profilePic : avatar}
          />
        </div>
      </div>
      <div className="mt-5">
        <p>{user.bio}</p>
        {currentUser?._id === user._id && (
          <Link to="/update">
            <button className="flex flex-row w-full gap-1 bg-gray-700 rounded-lg my-2 p-2 text-sm justify-center hover:bg-gray-800">
              <RiEditCircleLine className="w-4 h-auto text-gray-300" />{' '}
              <p className="text-gray-300">Edit Profile</p>
            </button>
          </Link>
        )}
        {currentUser?._id !== user._id && (
          <button
            className="w-full text-sm bg-gray-700 rounded-lg my-2 p-2 hover:bg-gray-800 disabled:opacity-70"
            onClick={handleFollow}
            disabled={updating}
          >
            {updating ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : following ? (
              <div className="flex flex-row gap-1 justify-center">
                <SlUserUnfollow className="w-4 h-auto text-gray-300" />
                <p className="text-gray-300"> Unfollow</p>
              </div>
            ) : (
              <div className="flex flex-row gap-1 justify-center">
                <SlUserFollow className="w-4 h-auto text-gray-300" />
                <p className="text-gray-300"> Follow</p>
              </div>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex gap-2 items-center">
          <p className="cursor-default">
            {user.followers.length}
            {user.followers.length > 1 ? ' followers' : ' follower'}
          </p>
          <span className="box"></span>
          <Link to={window.location.href} className="cursor-pointer">
            sharies.com
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <div className="p-2 hover:bg-gray-700 hover:rounded-full hover:transition-all hover:duration-400">
            <BsInstagram className="w-7 h-7 cursor-pointer" />
          </div>
          <div className="p-2 hover:bg-gray-700 hover:rounded-full hover:transition-all hover:duration-400 dropdown">
            <CgMoreO tabIndex="0" className="w-7 h-7 cursor-pointer" />
            <ul
              tabIndex="0"
              className="dropdown-content z-[1] menu mt-2 p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li className="px-2 cursor-pointer" onClick={copyUrl}>
                Copy Link
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* tabs */}
      <div className="flex flex-row w-full items-center text-center mt-5">
        <div className="flex-1 border-b-2 items-center pb-3 cursor-pointer">
          <p className="text-center  font-bold">Threads</p>
        </div>
        <div className="flex-1 border-b-2 border-b-gray-500 items-center pb-3 cursor-pointer">
          <p className="text-center  font-bold">Replies</p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
