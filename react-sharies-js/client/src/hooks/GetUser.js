import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const GetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, { id: 'dataError' });
          return;
        }
        setUser(data);
        return;
      } catch (err) {
        toast.error(err.message, { id: 'err' });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { loading, user };
};

export default GetUser;
