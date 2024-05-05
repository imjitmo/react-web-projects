import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataUpdate from './DataUpdate';
import UpdateProfile from './UpdateProfile';
export default function InformationCard() {
  const { currentUser } = useSelector((state) => state.user);
  const [userError, setUserError] = useState();
  const [userData, setUserData] = useState();
  const [displayName, setDisplayName] = useState();
  const [userSetup, setUserSetup] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/data/details/${currentUser._id}&${currentUser.username}`);
        const data = await res.json();
        if (data.error) {
          setUserError(true);
          return;
        }
        setUserError(false);
        setUserData(data);
        setDisplayName(data.firstName + ' ' + data.lastName);
        return;
      } catch (err) {
        console.log(err);
        setUserError(true);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <h1 className="header-text text-3xl text-center">Additional Information</h1>
      {userSetup ? (
        <UpdateProfile setError={() => setUserSetup(false)} />
      ) : userUpdate ? (
        <DataUpdate userData={userData} setError={() => setUserUpdate(false)} />
      ) : (
        <div className="flex flex-col gap-4 my-4">
          <p className="font-bold">
            Name: <span className="font-normal italic text-sm">{displayName ? displayName : '(empty)'}</span>
          </p>
          <p className="font-bold">
            Gender:{' '}
            <span className={`font-normal italic text-sm ${userData?.userGender && 'capitalize'}`}>
              {userData?.userGender || '(empty)'}
            </span>
          </p>
          <p className="font-bold">
            Contact:{' '}
            <span className="font-normal italic text-sm">
              {(userData?.contactNumber && `+63-${userData?.contactNumber}`) || '(empty)'}
            </span>
          </p>
          {/* <p className="font-bold">
            Address: <span className="font-normal italic text-sm">(empty)</span>
          </p> */}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {!userData ? (
          <button
            className={`primary-btn uppercase ${userSetup && 'hidden'}`}
            onClick={() => setUserSetup(true)}
          >
            Setup
          </button>
        ) : (
          !userUpdate && (
            <button
              className={`primary-btn uppercase ${userSetup && 'hidden'}`}
              onClick={() => setUserUpdate(true)}
            >
              Update
            </button>
          )
        )}
      </div>
    </div>
  );
}
