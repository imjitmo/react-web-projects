import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/user.slice.js';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [logError, setLogError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLogError(data);
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="header-text text-3xl text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button disabled={loading} className="primary-btn uppercase">
          {loading ? <span className="loading loading-dots loading-xs"></span> : 'Sign In'}
        </button>
        <OAuth nameType="Sign In" />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 hover:text-blue-700 font-semibold">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 capitalize">
        {logError ? logError.message || 'Something went wrong' : ''}
      </p>
    </div>
  );
}
