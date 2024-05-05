import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PaginationButtons from '../components/PaginationButtons';
import Pagination from '../utils/Pagination';
import { fadeIn } from '../utils/Variants';

export default function OwnerCount(props) {
  const listData = props && props.data && props.data.length > 0;
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const [empty, setEmpty] = useState(false);
  const [approvedList, setApprovedList] = useState();

  useEffect(() => {
    const fetchPending = async (props) => {
      try {
        if (!listData) {
          setEmpty(true);
          return;
        }
        setApprovedList(props);
        setEmpty(false);
      } catch (err) {
        setEmpty(true);
        console.log(err);
      }
    };

    fetchPending(props.data);
  }, [props.data]);

  const records = approvedList?.slice(firstIndex, lastIndex);
  const totalPages = approvedList?.length;
  const npage = Math.ceil(totalPages / recordsPerPage);
  const handleLink = (e) => {
    window.open(`${e}`, 'popup', 'width=800', 'height=600');
    return false;
  };
  return (
    <div className="max-w-full mx-auto p-5 overflow-x-auto text-center">
      <h1 className="text-4xl capitalize font-bold p-2">Approved Shops Lists</h1>
      {empty ? (
        <p>No data found</p>
      ) : (
        <>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Shop & Owner</th>
                <th>Address</th>
                <th>Services</th>
                <th>Enlistings</th>
                <th>DTI Permit #</th>
                <th>DTI Permit</th>
                <th>Action</th>
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
                    <span className="badge badge-ghost badge-s p-2 capitalize truncate">
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
                      Doc_{details?._id.slice(0, 8)}_Permit
                    </a>
                  </td>
                  <td>
                    <span
                      className="text-red-600 tooltip cursor-pointer"
                      data-tip="Deactivate"
                      onClick={() => props.updateOwner(details?._id, false, details?.userId)}
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
