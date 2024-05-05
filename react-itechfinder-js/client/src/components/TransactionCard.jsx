import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeIn } from '../utils/Variants';
import StarRate from './StarRate';

export default function TransactionCard(props) {
  const { data, mode, user, updateAppointment, setRateSuccess } = props;
  const userFilter = user === data?.ownerId ? true : false;
  const [reasonError, setReasonError] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [status, setStatus] = useState();
  const [declineReason, setDeclineReason] = useState();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const openModal = (e) => {
    document.getElementById(e).showModal();
  };

  const closeModal = (e) => {
    document.getElementById(e).close();
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    if (transactionId === undefined) {
      setReasonError(true);
      return;
    } else {
      setReasonError(false);
    }
    updateAppointment(transactionId, status, declineReason);
    closeModal(`modal__${transactionId}`);
  };

  return (
    <>
      <motion.div
        variants={fadeIn('right', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: false, amount: 0.3 }}
        className="card bg-base-100 shadow-xl w-full"
      >
        <div className="card-body">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
                <span className="text-lg self-center text-center">
                  {data.shopName
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </span>
              </div>
              <div className="truncate">
                <div className="flex flex-row gap-2 justify-center items-center font-bold text-xl truncate">
                  {data?.shopName}{' '}
                  <span
                    className={`text-sm font-normal uppercase ${
                      data?.status === 'pending'
                        ? 'text-blue-500'
                        : data?.status === 'in progress'
                        ? 'text-orange-500'
                        : data?.status === 'completed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    ({data?.status})
                  </span>
                  <span className="text-base opacity-70">#{data?._id.slice(0, 8)}</span>
                </div>
                <div className="text-xs opacity-70 capitalize">{data?.shopAddress}</div>
                <div className="text-xs opacity-70 capitalize">
                  <strong>Request Date:</strong>{' '}
                  <span className="italic">
                    {new Date(data?.createdAt).toLocaleDateString('en-US', options)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-2">
              <p className="text-sm">
                <strong>Customer: </strong>
                <span className="capitalize italic">{data?.fullname}</span>
              </p>
              <p className="text-sm">
                <strong>Contact #: </strong>
                <span className="capitalize italic">{data?.contactNumber}</span>
              </p>
              <p className="text-sm">
                <strong>Appointment Date: </strong>
                <span className="capitalize italic">
                  {new Date(data?.appointmentDate).toLocaleDateString('en-US', options)}
                </span>
              </p>
              <p className="text-sm">
                <strong>Issue: </strong>
                <span className="capitalize italic text-blue-700 px-2">
                  {data?.brand} - {data?.model}
                </span>
              </p>
              <p className="text-sm">
                <strong>Description: </strong>
                {data?.description}
              </p>
              {data?.status === 'cancelled' && data?.cancelReason && (
                <p className="text-sm">
                  <strong>Reason: </strong>
                  <span className="capitalize italic text-red-500">{data?.cancelReason[1]}</span>
                </p>
              )}
            </div>
          </div>

          <div className="card-actions justify-end">
            {data?.status === 'completed' && (
              <StarRate
                rating={data?.rating}
                shopId={data?.shopId}
                id={data?._id}
                setRateSuccess={setRateSuccess}
                userFilter={userFilter}
              />
            )}
            {userFilter && data?.status !== 'completed' && data?.status !== 'cancelled' && (
              <>
                <button
                  className="btn primary-btn"
                  onClick={() =>
                    updateAppointment(data?._id, mode === 'pending' ? 'in progress' : 'completed')
                  }
                >
                  {mode === 'pending' ? 'Accept' : mode === 'in progress' ? 'Complete' : ''}
                </button>
                {mode === 'pending' && (
                  <button className="btn google-btn" onClick={() => openModal(`modal__${data?._id}`)}>
                    Decline
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>

      <dialog key={`key_${data?._id}`} id={`modal__${data?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Reject Store Appointment</h3>
          <form
            onSubmit={onSubmitUpdate}
            className="flex flex-row w-full gap-2 items-center justify-center my-8"
          >
            <p className="basis-1/8">Reason: </p>
            <select
              name="reasonText"
              id="reasonText"
              className="basis-2/4 select select-bordered"
              onChange={(e) => {
                setTransactionId(data?._id);
                setStatus('cancelled');
                setDeclineReason(e.target.value);
              }}
              defaultValue={'DEFAULT'}
              required
            >
              <option value="DEFAULT" disabled>
                Select a reason
              </option>
              <option value="0_Unknown Issue">Unknown Issue</option>
              <option value="1_Unknown Device">Unknown Device Model</option>
              <option value="2_Wrong Brand">Wrong Brand</option>
              <option value="3_Out of Schedule">Out of Schedule</option>
            </select>
            <div className="basis-1/8">
              <button className="btn primary-btn">Submit</button>
            </div>
          </form>
          <p className="text-red-600">{reasonError ? 'Please select a reason' : ''}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
