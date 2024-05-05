import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import ShopCard from '../components/ShopCard';
import UpdateProfile from '../components/UpdateProfile';
import UserCard from '../components/UserCard';

export default function Appointment() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState();
  const [shopData, setShopData] = useState();
  const [userError, setUserError] = useState(false);
  const [shopError, setShopError] = useState(false);
  const navigate = useNavigate();
  const userId = searchParams.get('v');
  const shopId = searchParams.get('p');
  const userCheck = currentUser._id === userId ? true : false;
  !userId || !shopId ? navigate('/search') : null;
  useEffect(() => {
    //fetch user
    const fetchUser = async (userId, username) => {
      if (userCheck === false) {
        setUserError(true);
      }
      try {
        const res = await fetch(`/api/data/details/${userId}&${username}`);
        const data = await res.json();
        if (data.error) {
          setUserError(true);
          return;
        }
        setUserError(false);
        return data;
      } catch (err) {
        console.log(err);
        setUserError(true);
      }
    };

    //fetch shop
    const fetchShop = async (shop) => {
      try {
        const res = await fetch(`/api/store/details/${shop}`);
        const data = await res.json();
        if (data.error) {
          setShopError(true);
          return;
        }
        setShopError(false);
        return data;
      } catch (err) {
        console.log(err);
        setShopError(true);
      }
    };

    const fetchData = async () => {
      const user = await fetchUser(userId, currentUser.username);
      const shop = await fetchShop(shopId);
      user === undefined ? setUserError(true) : setUserData(user);
      shop === undefined ? setShopError(true) : setShopData(shop);
    };

    fetchData();
  }, [userError]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      {userError ? (
        <>
          <h3 className="text-2xl font-semibold">Please setup your profile first</h3>
          <UpdateProfile
            setError={(value) => {
              setUserError(value);
            }}
          />
        </>
      ) : (
        <div className="container">
          <h1 className="text-3xl font-semibold text-center">Appointment</h1>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            {userData && <UserCard data={userData} />}
            <span className="font-bold text-blue-700 hidden lg:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8 motion-safe:animate-pulse"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </span>
            {shopError ? <p>Please setup your shop first</p> : shopData && <ShopCard data={shopData} />}
          </div>
          <section id="issues" className="container my-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-semibold text-center capitalize">state your gadget issue</h2>
              {userData && shopData && <IssueCard shopData={shopData} userData={userData} />}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
