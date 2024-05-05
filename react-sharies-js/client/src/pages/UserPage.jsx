import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';
import Feed from '../components/Feed';
import UserHeader from '../components/UserHeader';
import GetUser from '../hooks/GetUser.js';

const UserPage = () => {
  const { user, loading } = GetUser();
  const { username } = useParams();
  const [post, setPost] = useRecoilState(postsAtom);
  const [fetchPost, setFetchPost] = useState(true);

  useEffect(() => {
    const getUserPost = async () => {
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, { id: 'postError' });
          return;
        }
        setPost(data);
        return;
      } catch (err) {
        setPost([]);
        toast.error(err.message, { id: 'err' });
      } finally {
        setFetchPost(false);
      }
    };

    getUserPost();
  }, [username, setPost]);

  if (!user && loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!user && !loading) return <h1 className="text-center text-3xl font-semibold">User Not Found!</h1>;

  return (
    <div>
      <UserHeader user={user} />
      {!fetchPost && post.length === 0 && (
        <h1 className="text-center text-3xl font-semibold"> User does not have any posts!</h1>
      )}
      {fetchPost && (
        <div className="flex justify-center items-center mx-auto my-12">
          <span className="self-center loading loading-ring loading-lg"></span>
        </div>
      )}

      {post.map((posts) => (
        <Feed key={posts._id} post={posts} postedBy={posts.postedBy} />
      ))}
    </div>
  );
};

export default UserPage;
