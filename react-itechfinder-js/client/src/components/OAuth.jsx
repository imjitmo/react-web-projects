import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebase.js';
import { signInSuccess } from '../redux/user/user.slice.js';
export default function OAuth(pageType) {
  const { nameType, loading } = pageType;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/profile');
    } catch (error) {
      console.log('Could not login with google!', error);
    }
  };

  return (
    <button type="button" onClick={handleGoogleClick} className="google-btn uppercase" disabled={loading}>
      {nameType} WITH GOOGLE
    </button>
  );
}
