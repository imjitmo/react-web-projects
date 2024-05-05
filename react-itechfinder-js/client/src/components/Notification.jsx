import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const notify = (count) =>
  toast.custom(
    <div className="bg-blue-200 p-4 rounded-2xl text-black flex gap-2 items-center justify-center">
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
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
        />
      </svg>
      {`You still have ${count} notifications!`}
    </div>,
    { id: 'notifMsg' }
  );
export default function Notification() {
  const { currentUser } = useSelector((state) => state.user);
  const [appointmentData, setAppointmentData] = useState();
  const [readSuccess, setReadSuccess] = useState();
  const userType = currentUser?.userType === 1 ? 'owner' : 'user';

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await fetch(`/api/appointment/view/${currentUser._id}/${userType}`);
        const data = await res.json();
        if (data.error) {
          setAppointmentData(0);
          return;
        }
        setAppointmentData(data);
        return;
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotification();
  }, [readSuccess]);

  const fetchRead = async (id) => {
    try {
      const res = await fetch(`/api/appointment/read/${id}/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) {
        console.log(data);
        return;
      }
      setReadSuccess(data);
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount =
    currentUser._id && appointmentData && appointmentData?.length > 0
      ? userType === 'owner'
        ? appointmentData?.filter((item) => item.ownerRead === false).length
        : appointmentData?.filter((item) => item.userRead === false).length
      : 0;

  useEffect(() => {
    unreadCount > 0 && notify(unreadCount);
  }, [unreadCount]);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <Toaster position="bottom-right" containerClassName="toaster mt-12 lg:mt-16 z-[1]" />
      <span
        tabIndex={0}
        className="btn p-3 bg-transparent border-none text-white rounded-full uppercase hover:bg-blue-600"
      >
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-sm bg-yellow-500 text-white">
            {appointmentData && userType === 'owner'
              ? appointmentData?.filter((item) => item.ownerRead === false).length
              : appointmentData
              ? appointmentData?.filter((item) => item.userRead === false).length
              : 0}
          </span>
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <div></div>
        </div>
      </span>
      <ul tabIndex={0} className={`dropdown-content z-[99] menu p-2 shadow rounded-box w-52 bg-slate-100 `}>
        {appointmentData ? (
          appointmentData?.map((item) => (
            <li
              key={item._id}
              className={`rounded-lg ${
                userType === 'owner'
                  ? item.ownerRead
                    ? 'bg-none'
                    : 'bg-blue-100'
                  : item.userRead
                  ? 'bg-none'
                  : 'bg-blue-100'
              }`}
              onMouseOver={() => {
                userType === 'owner'
                  ? item.ownerRead
                    ? ''
                    : fetchRead(item._id)
                  : item.userRead
                  ? ''
                  : fetchRead(item._id);
              }}
            >
              <a href={`/transactions?view=${item.status}`}>
                <div className="flex flex-row gap-1 text-blue-600 text-xs rounded-lg">
                  <p>
                    <strong>#{item._id.slice(0, 6)}</strong>
                  </p>
                  <p>{item.shopName}</p>
                </div>
              </a>
            </li>
          ))
        ) : (
          <li>
            <p className="text-blue-500">No Notifications Found!</p>
          </li>
        )}
      </ul>
    </div>
  );
}
