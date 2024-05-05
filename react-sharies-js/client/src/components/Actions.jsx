import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';
import userAtom from '../atoms/userAtom.js';

const Actions = ({ post }) => {
  const currentUser = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes.includes(currentUser?._id));
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [isLiking, setIsLiking] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');
  const [hidden, setHidden] = useState(true);

  const handleLike = async () => {
    if (!currentUser) return toast.error('You must be logged in to like a post', { id: 'errLike' });
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch(`/api/posts/like/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error, { id: 'likErr' });

      if (!liked) {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, currentUser._id] };
          }
          return p;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: p.likes.filter((id) => id !== currentUser._id) };
          }
          return p;
        });
        setPosts(updatedPosts);
      }

      setLiked(!liked);
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async () => {
    if (!currentUser) return toast.error('You must be logged in to post a reply', { id: 'errReply' });
    setIsReply(true);
    try {
      const res = await fetch(`/api/posts/reply/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reply }),
      });
      const data = await res.json();

      if (data.error) return toast.error(data.error, { id: 'repError' });

      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, replies: [...p.replies, data] };
        }
        return p;
      });
      setPosts(updatedPosts);
      setHidden(true);
      setReply('');
      toast.success('Reply posted successfully', { id: 'respSuccess' });
      return;
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setIsReply(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 my-2 w-full" onClick={(e) => e.preventDefault()}>
          <svg
            aria-label="Like"
            color={liked ? 'rgb(237, 73, 86)' : ''}
            fill={liked ? 'rgb(237, 73, 86)' : 'transparent'}
            height="19"
            role="img"
            viewBox="0 0 24 22"
            width="20"
            className="cursor-pointer"
            onClick={handleLike}
          >
            <path
              d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
              stroke="currentColor"
              strokeWidth="2"
            ></path>
          </svg>

          <svg
            aria-label="Comment"
            color=""
            fill=""
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            className="cursor-pointer"
            onClick={() => {
              setHidden(!hidden);
              setReply('');
            }}
          >
            <title>Comment</title>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>

          <RepostSVG />
          <ShareSVG />
        </div>

        <div className="flex gap-2 items-center cursor-default">
          <p className="text-gray-500 text-sm">{post.replies.length} reply</p>
          <span className="box"></span>
          <p className="text-gray-500 text-sm cursor-default">{post.likes.length} like</p>
        </div>
        {/* reply form */}
        <div hidden={hidden}>
          <p className="my-2 text-sm font-semibold">Send your reply</p>
          <div className="max-w-[540px]">
            <input
              className="rounded-lg p-2 w-[340px] lg:w-[540px]"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="your reply goes here..."
            />
          </div>
          <div className="flex flex-row-reverse w-full my-2 gap-4">
            <button
              className="w-32 rounded-lg p-2 bg-gray-700 text-gray-300 hover:bg-gray-900 float-right disabled:opacity-80"
              onClick={handleReply}
              disabled={isReply}
            >
              {isReply ? <span className="loading loading-dots loading-sm"></span> : 'Reply'}
            </button>
            <button
              className="w-32 rounded-lg p-2 bg-red-800 text-gray-300 hover:bg-red-900 float-right disabled:opacity-80"
              onClick={() => {
                setHidden(!hidden);
                setReply('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;

const RepostSVG = () => {
  return (
    <svg
      aria-label="Repost"
      color="currentColor"
      fill="currentColor"
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
    >
      <title>Repost</title>
      <path
        fill=""
        d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
      ></path>
    </svg>
  );
};

const ShareSVG = () => {
  return (
    <div className="flex flex-col">
      <svg
        aria-label="Share"
        color=""
        fill="rgb(243, 245, 247)"
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
      >
        <title>Share</title>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="22"
          x2="9.218"
          y1="3"
          y2="10.083"
        ></line>
        <polygon
          fill="none"
          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polygon>
      </svg>
    </div>
  );
};
