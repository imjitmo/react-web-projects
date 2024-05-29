// import { useState } from 'react';
import Signin from './forms/Signin';
// import Signup from './forms/Signup';

const Login = () => {
  // const [authenticationType, setAuthenticationType] = useState('signin');
  return (
    <section
      className="flex items-center justify-center min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('/felicitas_bg.jpg')`,
      }}
    >
      <div className="flex flex-row items-center justify-evenly w-[600px] h-full py-6 px-8 bg-white rounded-lg gap-2">
        <div className="flex gap-4 flex-col w-full md:w-[400px]">
          {/** FORMS */}
          <Signin />
          {/* {authenticationType === 'signin' ? (
            <Signin setAuthenticationType={setAuthenticationType} />
          ) : (
            <Signup setAuthenticationType={setAuthenticationType} />
          )} */}
        </div>
        <div className="flex items-center justify-center w-[200px]">
          <img
            src="/felicitas_logo.png"
            className="block dark:hidden object-fill object-center m-auto"
            alt="logo"
          />
          <img
            src="/felicitas_logo_white.png"
            className="hidden dark:block object-fill object-center m-auto"
            alt="logo"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
