import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PaginationButtons from '../components/PaginationButtons';
import Pagination from '../utils/Pagination';
import { fadeIn } from '../utils/Variants';

export default function UserCount(props) {
  const listData = props && props.data && props.data.length > 0;
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const [empty, setEmpty] = useState(false);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchPending = async (props) => {
      try {
        if (!listData) {
          setEmpty(true);
          return;
        }
        setListUser(props);
        setEmpty(false);
      } catch (err) {
        setEmpty(true);
        console.log(err);
      }
    };

    fetchPending(props.data);
  }, [props]);

  const handleUserType = async (id, type, status) => {
    try {
      const res = await fetch(`/api/user/status/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, status }),
      });
      const data = await res.json();
      toast.success('User Updated!', { id: 'strMsg', position: 'bottom-left' });
      props?.setUpdateData(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const records = listUser?.slice(firstIndex, lastIndex);
  const totalPages = listUser?.length;
  const npage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div className="max-w-full mx-auto p-5 overflow-x-auto text-center">
      <h1 className="text-4xl capitalize font-bold p-2">Users Lists</h1>
      {empty ? (
        <p>No data found</p>
      ) : (
        <>
          <table className="table table-fixed capitalize">
            {/* head */}
            <thead>
              <tr className="cursor-default">
                <th>
                  <p>Name</p>
                </th>
                <th width="10%">User Status</th>
                <th width="10%">User Type</th>
                <th width="10%">User Level</th>
                <th width="10%">Owner Status</th>
                <th width="15%">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {records?.map((details) => (
                <motion.tr
                  key={details?._id}
                  variants={fadeIn('right', 0.3)}
                  initial="hidden"
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <td className="lowercase">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 justify-center items-center bg-slate-400 text-white font-bold rounded-xl uppercase">
                        <span className="text-lg self-center text-center">{details?.username[0]}</span>
                      </div>
                      <div>
                        <div className="font-bold">{details?.displayName || details?.username}</div>
                        <div className="text-sm opacity-50">{details?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`capitalize italic ${
                        details?.isVerified ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {details?.isVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </td>
                  <td>{details?.userType === 1 ? 'Owner' : 'Consumer'}</td>
                  <td>{details?.isAdmin ? 'Admin' : 'User'}</td>
                  <td>{details?.isOwner ? 'Yes' : 'No'}</td>
                  <td className="flex flex-row gap-2 w-full">
                    {details?._id !== props?.user._id && (
                      <>
                        <span
                          className="tooltip"
                          data-tip={
                            props?.user.adminLevel > 2
                              ? details?.isAdmin
                                ? 'Set as User'
                                : 'Set as Admin'
                              : 'You are not a super admin'
                          }
                          onClick={() =>
                            props?.user.adminLevel > 2 &&
                            handleUserType(details?._id, 'level', details?.isAdmin)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className={`size-6 grow ${
                              details?.isAdmin ? 'text-blue-500' : 'text-yellow-500'
                            } cursor-pointer`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </span>
                        {props?.user.adminLevel > 0 && (
                          <span>
                            {details?.isActive ? (
                              <span
                                className="tooltip"
                                data-tip="Set as Inactive"
                                onClick={() => handleUserType(details?._id, 'status', details?.isActive)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6 grow text-red-500 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <span
                                className="tooltip"
                                data-tip="Set as Active"
                                onClick={() => handleUserType(details?._id, 'status', details?.isActive)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6 grow text-green-500 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Name</th>
                <th>User Status</th>
                <th>User Type</th>
                <th>User Level</th>
                <th>Owner Status</th>
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
        </>
      )}
    </div>
  );
}
