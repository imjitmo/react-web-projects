import { useState } from 'react';
import Signin from './forms/Signin';
import Signup from './forms/Signup';

const Login = () => {
  const [authenticationType, setAuthenticationType] = useState('signin');
  return (
    <section
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          'linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url(https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/350508483_933305101248357_6402011176098709504_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7pkEP8ygDDsQ7kNvgFRw-Qx&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYAg8QvMEWN5xmG__8plR04fgv7HUFkpbou_etr77usC2w&oe=6642F91E)',
      }}
    >
      <div className="flex flex-row w-[600px] h-full p-10 bg-white rounded-lg gap-2">
        <div className="flex gap-4 flex-col w-1/2">
          {/** FORMS */}

          {authenticationType === 'signin' ? (
            <Signin setAuthenticationType={setAuthenticationType} />
          ) : (
            <Signup setAuthenticationType={setAuthenticationType} />
          )}
        </div>
        <div className="h-auto w-1/2 bg-[url(https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/329021817_1618374768591424_5088386992496064030_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mSXQ91NwVEsQ7kNvgFqFpL3&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYC7U1opxM7Y_5Lk1NJ-pupl9OmPBDLC05GWAmYQs_ejrg&oe=66431290)] bg-contain bg-no-repeat bg-center"></div>
      </div>
    </section>
  );
};

export default Login;
