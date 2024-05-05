import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import TransactionCard from '../components/TransactionCard';

export default function Transactions() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams({ view: '' });
  const tabView = searchParams.get('view');
  const [appointmentData, setAppointmentData] = useState();
  const [fetchError, setFetchError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState();
  const [rateSuccess, setRateSuccess] = useState();
  const listSort = appointmentData?.filter((item) => item.status === tabView);
  const userType = currentUser.userType === 1 ? 'owner' : 'user';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/appointment/view/${currentUser._id}/${userType}`);
        const data = await res.json();
        if (data.error) {
          setFetchError(true);
          return;
        }
        setAppointmentData(data);
        setFetchError(false);
        return;
      } catch (err) {
        console.log(err);
        setFetchError(true);
      }
    };

    fetchTransactions();
  }, [location.search, updateSuccess, rateSuccess]);

  const updateAppointment = async (id, status, reason) => {
    console.log(id, status, reason);
    try {
      const res = await fetch(`/api/appointment/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, reason }),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data);
        return;
      }
      setUpdateSuccess(data.success + Math.random());
      status === 'in progress' && setSearchParams({ view: 'in progress' });
      status === 'completed' && setSearchParams({ view: 'completed' });
      status === 'completed' && setSearchParams({ view: 'completed' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-7 my-4">
      <div className="flex items-center justify-center">
        <ul className="flex flex-row px-4 gap-4 text-sm lg:text-base">
          <li>
            <button className="appointment-btn" onClick={() => setSearchParams({ view: 'pending' })}>
              Pending ({appointmentData?.filter((item) => item.status === 'pending').length || 0})
            </button>
          </li>
          <li>
            <button className="appointment-btn" onClick={() => setSearchParams({ view: 'in progress' })}>
              In Progress ({appointmentData?.filter((item) => item.status === 'in progress').length || 0})
            </button>
          </li>
          <li>
            <button className="appointment-btn" onClick={() => setSearchParams({ view: 'completed' })}>
              Completed ({appointmentData?.filter((item) => item.status === 'completed').length || 0})
            </button>
          </li>
          <li>
            <button className="appointment-btn" onClick={() => setSearchParams({ view: 'cancelled' })}>
              Cancelled ({appointmentData?.filter((item) => item.status === 'cancelled').length || 0})
            </button>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="flex flex-col px-4 gap-4 items-center justify-center w-full">
          {fetchError
            ? 'No Transactions Available'
            : listSort &&
              listSort?.map((item) => (
                <TransactionCard
                  key={item._id}
                  data={item}
                  mode={tabView}
                  user={currentUser._id}
                  updateAppointment={updateAppointment}
                  setRateSuccess={setRateSuccess}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
