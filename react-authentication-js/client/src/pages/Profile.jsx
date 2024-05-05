import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase/firebase.js';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/user.slice.js';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUplaodPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${Math.floor(Math.random() * 10000).toString()}_${image.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUplaodPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          name="picture"
          id="picture"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile_picture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error uploading image...</span>
          ) : uploadPercent > 0 && uploadPercent < 100 ? (
            <span className="text-slate-400">Uploading: {uploadPercent}%</span>
          ) : uploadPercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          name="username"
          id="username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65"
          disabled={loading}
        >
          {loading ? <span className="loading loading-dots loading-xs"></span> : 'Update'}
        </button>
      </form>
      <div className="flex mt-5">
        <p className="text-red-700">{error && 'Something went wrong'}</p>
        <p className="text-green-700">{updateSuccess && 'Profile updated successfully!'}</p>
      </div>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign out
        </span>
      </div>
    </div>
  );
}
