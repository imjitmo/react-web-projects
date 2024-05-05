import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';
import Feed from '../components/Feed';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/feed`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, { id: 'feedError' });
          return;
        }
        setPosts(data);
        return;
      } catch (err) {
        toast.error(err.message, { id: 'err' });
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [setPosts]);
  return (
    <>
      <div className="flex justify-center items-center">
        {!loading && posts.length === 0 && (
          <h1 className="text-2xl">Follow some users to something on your feed.</h1>
        )}
        {loading && <span className="loading loading-ring loading-lg"></span>}
      </div>
      {posts.map((feed) => (
        <Feed key={feed._id} post={feed} postedBy={feed.postedBy} />
      ))}
    </>
  );
};

export default Home;
