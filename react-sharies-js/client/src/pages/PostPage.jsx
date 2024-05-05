import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';
import userAtom from '../atoms/userAtom.js';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import DeletePost from '../components/DeletePost';
import GetUser from '../hooks/GetUser';

const PostPage = () => {
  const { user, loading } = GetUser();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, { id: 'errMsg' });
          return;
        }
        setPosts([data]);
      } catch (err) {
        toast.error(err.message, { id: 'err' });
      }
    };

    getPost();
  }, [pid, setPosts]);

  if (!user && loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (!currentPost) return null;

  return (
    <>
      <div className="flex w-full gap-2 mb-4 py-5">
        <div className="flex flex-1 flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            {/* flex1 */}
            <div className="flex w-full items-center gap-2">
              <img className="w-12 object-contain rounded-full" alt={user.username} src={user.profilePic} />
              <p className="text-sm font-bold">{user.username}</p>
              <img src="/verified.png" className="w-4 h-4 ml-1" alt="verified" />
            </div>
            {/* flex2 */}
            <div className="flex items-center gap-2">
              <p className=" text-right text-[10px] w-[100px] text-gray-400">
                {formatDistanceToNow(new Date(currentPost.createdAt))}
              </p>

              <DeletePost
                postId={currentPost._id}
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
          <p className="text-sm">{currentPost.text}</p>
          {currentPost.img && (
            <div className="rounded-lg overflow-hidden border-solid border border-gray-400">
              <img className="w-full object-contain" src={currentPost.img} alt="post" />
            </div>
          )}
          <div className="flex flex-row gap-3 my-1">{currentPost && <Actions post={currentPost} />}</div>
          {/* <div className="flex gap-2 items-center">
            <p className="text-gray-500 text-sm">1 reply</p>
            <span className="box"></span>
            <p className="text-gray-500 text-sm">{200 + (liked ? 1 : 0)} likes</p>
          </div> */}
          {!user && (
            <>
              <div className="divider"></div>
              <div className="flex justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-2xl cursor-pointer">👋</p>
                  <p className="text-gray-500">Get the app to like, reply and post.</p>
                </div>
                <button className="bg-slate-700 rounded-lg p-2 px-4 hover:opacity-80 text-white font-semibold">
                  Get
                </button>
              </div>
              <div className="divider"></div>
            </>
          )}
          <div className="my-2">
            {currentPost.replies.map((reply, i) => (
              <Comment key={i} reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
