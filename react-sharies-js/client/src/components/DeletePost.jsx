import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidShareAlt } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import postsAtom from '../atoms/postsAtom.js';

const DeletePost = ({ postId, userId, currentUser, username }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const handleDelete = async () => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        background: '#334155',
        color: '#fff',
        confirmButtonColor: '#334155',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleting(true);
          const res = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.error) {
            toast.error(data.error, { id: 'delError' });
            return;
          }
          toast.success('post deleted succesfully!', { id: 'delSuccess' });
          setPosts((prev) => prev.filter((p) => p._id !== postId));
          return navigate(`/${username}`);
        }
      });
    } catch (err) {
      toast.error(err.message, { id: 'err' });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="dropdown" onClick={(e) => e.preventDefault()}>
      {deleting ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <BsThreeDots tabIndex="0" className="cursor-pointer" />
      )}
      <ul tabIndex="0" className="dropdown-content z-[1] menu shadow-lg bg-gray-800 rounded-box">
        {currentUser === userId ? (
          <li onClick={handleDelete}>
            <FaTrashAlt className="w-12 h-auto text-red-500 hover:text-red-700" />
          </li>
        ) : (
          <li>
            <BiSolidShareAlt className="w-12 h-auto" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default DeletePost;
