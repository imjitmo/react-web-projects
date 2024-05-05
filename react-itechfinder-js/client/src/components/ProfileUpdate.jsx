import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/user.slice.js';

export default function ProfileUpdate() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUserAvailable, setIsUserAvailable] = useState({ success: false, fail: false, error: '' });
  const [isEmailAvailable, setIsEmailAvailable] = useState({ success: false, fail: false, error: '' });
  const [isUserLoad, setIsUserLoad] = useState(false);
  const [isEmailLoad, setIsEmailLoad] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUserAvailable.success === false || isUserAvailable.fail === true) return;
    if (isEmailAvailable.success === false || isEmailAvailable.fail === true) return;
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
      window.location.reload();
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };

  const checkUsername = async () => {
    if (formData.username === currentUser.username || formData.username === undefined) {
      setIsUserAvailable({ success: true, fail: false, message: '' });
      return;
    }
    if (formData.username === '') {
      setIsUserAvailable({ success: false, fail: true, message: 'username field cannot be empty.' });
      return;
    }
    try {
      setIsUserLoad(true);
      const res = await fetch(`/api/user/validateUsername/${currentUser._id}/${formData.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsUserAvailable({ success: false, fail: true, message: data.message });
        setIsUserLoad(false);
        return;
      }
      setIsUserAvailable({ success: true, fail: false, message: data.message });
      setIsUserLoad(false);
      return;
    } catch (err) {
      setIsUserAvailable({ success: false, fail: true, message: err });
      setIsUserLoad(false);
    }
  };

  const checkEmail = async () => {
    if (formData.email === currentUser.email || formData.email === undefined) {
      setIsEmailAvailable({ success: true, fail: false, message: '' });
      return;
    }
    if (formData.username === '') {
      setIsEmailAvailable({ success: false, fail: true, message: 'username field cannot be empty.' });
      return;
    }
    try {
      setIsEmailLoad(true);
      const res = await fetch(`/api/user/validateEmail/${currentUser._id}/${formData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsEmailAvailable({ success: false, fail: true, message: data.message });
        setIsEmailLoad(false);
        return;
      }
      setIsEmailAvailable({ success: true, fail: false, message: data.message });
      setIsEmailLoad(false);
      return;
    } catch (err) {
      setIsEmailAvailable({ success: false, fail: true, message: err });
      setIsEmailLoad(false);
    }
  };
  console.log(isUserLoad, isEmailLoad);
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="input input-bordered flex items-center bg-slate-100 gap-2">
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={currentUser.username}
            className="bg-slate-100 grow"
            placeholder="username"
            onChange={handleChange}
            onBlur={checkUsername}
            disabled={isUserLoad}
            required
          />
          {isUserLoad ? <span className="loading loading-spinner loading-xs float-right"></span> : ''}
        </label>
        {isUserAvailable.success && isUserAvailable.message !== '' ? (
          <span className="text-green-600 text-sm flex flex-row gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {isUserAvailable.message}
          </span>
        ) : (
          ''
        )}
        {isUserAvailable.fail ? (
          <span className="text-red-600 text-sm flex flex-row gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {isUserAvailable.message}
          </span>
        ) : (
          ''
        )}
        <label className="input input-bordered flex items-center bg-slate-100 gap-2">
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={currentUser.email}
            className="bg-slate-100 grow"
            placeholder="email"
            onChange={handleChange}
            onBlur={checkEmail}
            disabled={isEmailLoad}
            required
          />
          {isEmailLoad ? <span className="loading loading-spinner loading-xs float-right"></span> : ''}
        </label>
        {isEmailAvailable.success && isEmailAvailable.message !== '' ? (
          <span className="text-green-600 text-sm flex flex-row gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {isEmailAvailable.message}
          </span>
        ) : (
          ''
        )}
        {isEmailAvailable.fail ? (
          <span className="text-red-600 text-sm flex flex-row gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {isEmailAvailable.message}
          </span>
        ) : (
          ''
        )}
        <input
          type="password"
          name="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="password"
          onChange={handleChange}
        />
        <button className="primary-btn uppercase" disabled={loading}>
          {loading ? <span className="loading loading-dots loading-xs"></span> : 'Update'}
        </button>
      </form>
      <div className="flex mt-5">
        <p className="text-red-500">{error && 'Something went wrong'}</p>
        <p className="text-green-500">{updateSuccess && 'Profile updated successfully!'}</p>
      </div>
    </div>
  );
}
