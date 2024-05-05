import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import SigninCard from '../components/SigninCard';
import SignupCard from '../components/SignupCard';

const Auth = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <div>{authScreenState === 'signin' ? <SigninCard /> : <SignupCard />}</div>;
};

export default Auth;
