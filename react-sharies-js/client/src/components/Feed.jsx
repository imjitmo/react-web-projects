import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Actions from './Actions';
import avatar from '/profile.png';

//time format
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import DeletePost from './DeletePost';

const Feed = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, { id: 'feedError' });
          return;
        }
        setUser(data);
        return;
      } catch (err) {
        toast.error(err.message, { id: 'err' });
      }
    };
    getUser();
  }, [postedBy]);

  if (!user) return null;

  return (
    <div className="flex w-full gap-2 mb-4 py-5">
      <div
        className="flex flex-col justify-center"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/${user?.username}`);
        }}
      >
        <img
          className="w-12 object-contain rounded-full cursor-pointer"
          alt={user?.username}
          src={user?.profilePic || avatar}
        />
        <div className="post-line"></div>
        <div className="relative w-full mx-2">
          {post.replies.length === 0 && <p className="text-center">🥱</p>}
          {post.replies[0] && (
            <img
              className="liked-img top-0 left-0"
              src={post.replies[0].userProfilePic || avatar}
              alt={user?.username}
            />
          )}
          {post.replies[1] && (
            <img
              className="liked-img top-0 left-2"
              src={post.replies[1].userProfilePic || avatar}
              alt="image"
            />
          )}

          {post.replies[2] && (
            <img
              className="liked-img top-0 left-4"
              src={post.replies[2].userProfilePic || avatar}
              alt="image"
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between w-full">
          {/* flex1 */}
          <div
            className="flex w-full items-center"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          >
            <p className="text-sm font-bold cursor-pointer">{user?.username}</p>
            {user?.isActive && <img src="/verified.png" className="w-4 h-4 ml-1" alt="verified" />}
          </div>
          {/* flex2 */}
          <div className="flex items-center gap-2">
            <p className="text-right text-[10px] w-[100px] text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt))}
            </p>
            <DeletePost
              postId={post._id}
              userId={user._id}
              currentUser={currentUser._id}
              username={user.username}
            />
            {/* <div className="dropdown" onClick={(e) => e.preventDefault()}>
              <BsThreeDots tabIndex="0" className="cursor-pointer" />
              <ul tabIndex="0" className="dropdown-content z-[1] menu shadow-lg bg-gray-800 rounded-box">
                {currentUser._id === user._id ? (
                  <li onClick={handleDelete}>
                    <FaTrashAlt className="w-12 h-auto text-red-500 hover:text-red-700" />
                  </li>
                ) : (
                  <li>
                    <BiSolidShareAlt className="w-12 h-auto" />
                  </li>
                )}
              </ul>
            </div> */}
          </div>
        </div>
        {/* Title */}
        <Link to={`/${user?.username}/post/${post._id}`}>
          <p className="text-sm cursor-text">{post.text}</p>
          {post.img && (
            <div className="rounded-lg overflow-hidden border-solid border border-gray-400">
              <img className="w-full object-contain cursor-pointer" src={post.img} alt="post" />
            </div>
          )}
        </Link>
        <div className="flex flex-row gap-3 my-1">
          <Actions post={post} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
