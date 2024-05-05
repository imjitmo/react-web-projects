import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validatePass, setValidatePass] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePass === false) return;
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        setErrorMessage(data.message);
        return;
      }
      toast.success('User Registration Successful! Please check your inbox or spam to verify!', {
        id: 'strMsg',
        position: 'bottom-center',
        duration: 5000,
      });
      setFormData({});
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handlePassword = async () => {
    if (!formData.repeat_password) return;
    formData.repeat_password === formData.password ? setValidatePass(true) : setValidatePass(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="header-text text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="input input-bordered bg-slate-100 p-3 rounded-lg"
          value={formData?.username || ''}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          className="input input-bordered bg-slate-100 p-3 rounded-lg"
          value={formData?.email || ''}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="input input-bordered bg-slate-100 p-3 rounded-lg"
          value={formData?.password || ''}
          onChange={handleChange}
          onBlur={handlePassword}
          required
        />
        <input
          type="password"
          name="repeat_password"
          id="repeat_password"
          placeholder="Repeat Password"
          className="input input-bordered bg-slate-100 p-3 rounded-lg"
          value={formData?.repeat_password || ''}
          onChange={handleChange}
          onBlur={handlePassword}
          required
        />
        {validatePass === false ? <span className="text-red-700">Password does not match!</span> : ''}
        {/* <select
          className="select select-bordered bg-slate-100 p-3 rounded-lg"
          name="userType"
          id="userType"
          defaultValue={'DEFAULT'}
          required
          onChange={handleChange}
        >
          <option value="DEFAULT" disabled>
            Select user type
          </option>
          <option value="1">Owner</option>
          <option value="0">User</option>
        </select> */}
        <button disabled={loading} className="primary-btn uppercase">
          {loading ? <span className="loading loading-dots loading-xs"></span> : 'Sign Up'}
        </button>
        <OAuth nameType="Sign Up" loading={loading} />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 hover:text-blue-700 font-semibold">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 capitalize">{error && errorMessage}</p>
      <Toaster />
    </div>
  );
}
