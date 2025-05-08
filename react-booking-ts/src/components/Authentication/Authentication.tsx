import { useState } from 'react';
import Signin from './forms/Signin';
import Signup from './forms/Signup';

const Login = () => {
  const [authenticationType, setAuthenticationType] = useState('signin');
  return (
    <section className="flex items-center justify-center content-center min-h-screen w-full bg-cover bg-no-repeat">
      <div className="flex flex-row items-center justify-evenly w-[600px] h-full py-6 bg-white rounded-lg gap-2">
        <div className="flex gap-4 flex-col w-full md:w-[500px] shadow-2xl drop-shadow-2xl rounded-2xl p-8">
          <h1 className="text-center text-2xl font-bold">SOFTNET Hotel Login</h1>
          {/** FORMS */}
          {/* <Signin /> */}
          {authenticationType === 'signin' ? (
            <Signin setAuthenticationType={setAuthenticationType} />
          ) : (
            <Signup setAuthenticationType={setAuthenticationType} />
          )}
          <span className="text-center text-sm text-slate-900/60">
            © 2025 FOSSH | Front Office System with QR Technology
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;
