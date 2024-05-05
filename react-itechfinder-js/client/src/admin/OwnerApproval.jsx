import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PaginationButtons from '../components/PaginationButtons';
import Pagination from '../utils/Pagination';
import { fadeIn } from '../utils/Variants';

export default function OwnerApproval(props) {
  const listData = props && props.data && props.data.length > 0;
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const [empty, setEmpty] = useState(false);
  const [pendingList, setPendingList] = useState();
  const [applyStatus, setApplyStatus] = useState();
  const [userId, setUserId] = useState();
  const [shopId, setShopId] = useState();
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    const fetchPending = async (props) => {
      try {
        if (!listData) {
          setEmpty(true);
          return;
        }
        setPendingList(props);
        setEmpty(false);
      } catch (err) {
        setEmpty(true);
        console.log(err);
      }
    };

    fetchPending(props.data);
  }, [props]);
  const records = pendingList?.slice(firstIndex, lastIndex);
  const totalPages = pendingList?.length;
  const npage = Math.ceil(totalPages / recordsPerPage);

  const handleLink = (e) => {
    window.open(`${e}`, 'popup', 'width=800', 'height=600');
    return false;
  };

  const openModal = (e) => {
    document.getElementById(e).showModal();
  };

  const closeModal = (e) => {
    document.getElementById(e).close();
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    if (shopId === undefined) {
      setReasonError(true);
      return;
    } else {
      setReasonError(false);
    }
    await props.updateOwner(shopId, applyStatus, userId);
    // data.updateOwner();
    closeModal(`modal__${shopId}`);
  };

  return (
    <div className="max-w-full mx-auto p-5 overflow-x-auto text-center">
      <h1 className="text-4xl capitalize font-bold p-2">Pending Shops Lists</h1>
      {empty ? (
        <p>No data found</p>
      ) : (
        <>
          <table className="table table-fixed">
            {/* head */}
            <thead>
              <tr>
                <th width="15%">Shop & Owner</th>
                <th width="15%">Address</th>
                <th width="10%">Services</th>
                <th width="10%">Enlistings</th>
                <th width="10%">DTI Permit #</th>
                <th width="10%">DTI Permit</th>
                <th width="5%">Status</th>
                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {records?.map((details) => (
                <motion.tr
                  key={details._id}
                  variants={fadeIn('right', 0.3)}
                  initial="hidden"
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{details?.shopName}</div>
                        <div className="text-sm opacity-50">{details?.ownerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="capitalize">
                    {details?.shopAddress.shopStreet}, {details?.shopAddress.shopBarangay}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {details.shopAddress.shopCity}, {details?.shopAddress.shopProvince}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm bg-blue-600 text-white p-2 capitalize">
                      {details?.shopType.join(' & ')}
                    </span>
                  </td>

                  <td>
                    <span className="text-sm italic capitalize line-clamp-0 rounded-sm">
                      {details?.gadgetList.join(', ')}
                    </span>
                  </td>
                  <td>
                    <span className="capitalize italic">{details?.permitNo}</span>
                  </td>
                  <td>
                    <a
                      rel="nofollow noopener noreferrer"
                      className="capitalize text-blue-600 font-semibold cursor-pointer"
                      onClick={() => handleLink(details?.permitPhoto)}
                    >
                      Doc_{details._id.slice(0, 8)}_Permit
                    </a>
                  </td>
                  <td>
                    <span className="text-red-600 capitalize italic">
                      {details?.isRepeat
                        ? `Rejected - ${details?.repeatReason[1]}`
                        : details?.isApproved
                        ? 'Approved'
                        : 'Pending'}
                    </span>
                  </td>
                  <td className="flex flex-row items-center justify-center gap-1">
                    <span
                      className="text-green-600 tooltip cursor-pointer"
                      data-tip="Approve"
                      onClick={() => {
                        props.updateOwner(details?._id, true, details?.userId);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                    <span
                      className="text-red-600 tooltip cursor-pointer"
                      data-tip="Reject"
                      onClick={() => openModal(`modal__${details?._id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Shop & Owner</th>
                <th>Address</th>
                <th>Services</th>
                <th>Enlistings</th>
                <th>DTI Permit #</th>
                <th>DTI Permit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
          {npage ? (
            <PaginationButtons
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              npage={npage}
              recordsPerPage={recordsPerPage}
            />
          ) : null}
          {records?.map((details) => (
            <dialog key={`key_${details?._id}`} id={`modal__${details?._id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Reject Store Application</h3>
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
                      setApplyStatus(e.target.value);
                      setShopId(details?._id);
                      setUserId(details?.userId);
                    }}
                    defaultValue={'DEFAULT'}
                    required
                  >
                    <option value="DEFAULT" disabled>
                      Select a reason
                    </option>
                    <option value="0_Invalid Permit">Invalid Permit</option>
                    <option value="1_Incorrect Shop Name">Incorrect Shop Name</option>
                    <option value="2_Incorrect Owner Name">Incorrect Owner Name</option>
                    <option value="3_Incorrect Address">Incorrect Address</option>
                    <option value="4_Incorrect Permit Number">Incorrect Permit Number</option>
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
          ))}
        </>
      )}
    </div>
  );
}
