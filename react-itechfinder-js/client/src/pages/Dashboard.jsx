import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import OwnerApproval from '../admin/OwnerApproval.jsx';
import OwnerCount from '../admin/OwnerCount.jsx';
import ShopCount from '../admin/ShopCount.jsx';
import UserCount from '../admin/UserCount.jsx';

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams({ view: '' });
  const [dataList, setDataList] = useState();
  const [updateSuccess, setUpdateSuccess] = useState();
  const [updateData, setUpdateData] = useState();

  const tabView = searchParams.get('view');
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/api/store/all');
        const data = await res.json();
        if (data.error) {
          setDataList([]);
          return;
        }
        setDataList(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [updateSuccess, updateData]);

  const updateOwner = async (id, applyStatus, userId) => {
    try {
      const res = await fetch(`/api/store/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applyStatus, userId }),
      });
      const data = await res.json();
      if (data.error === true) {
        toast.erropr('Store Update Failed', { id: 'strMsg', position: 'bottom-left' });
        return;
      }
      toast.success('Store Updated', { id: 'strMsg', position: 'bottom-left' });
      setUpdateSuccess(data.success);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-full mx-auto">
      <section id="cards" className="m-10 flex flex-col lg:flex-row gap-10">
        <div className="card w-full bg-gradient-to-r from-blue-400 to-blue-950 image-full">
          {/* <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title">Pending Owner</h2>
            <p className="font-bold text-4xl text-white">{dataList?.pendingOwner?.length || 0}</p>
            <div className="card-actions justify-end">
              <button
                className="btn primary-btn px-10 rounded-full border-0"
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set('view', 'viewApprovals');
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-gradient-to-r from-blue-400 to-blue-950 image-full">
          {/* <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title">Approved Owners</h2>
            <p className="font-bold text-4xl text-white">{dataList?.approvedShops?.length || 0}</p>
            <div className="card-actions justify-end">
              <button
                className="btn primary-btn px-10 rounded-full border-0"
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set('view', 'viewOwners');
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-gradient-to-r from-blue-400 to-blue-950 image-full">
          {/* <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title">Shops</h2>
            <p className="font-bold text-4xl text-white">{dataList?.shopCount?.length || 0}</p>
            <div className="card-actions justify-end">
              <button
                className="btn primary-btn px-10 rounded-full border-0"
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set('view', 'viewShops');
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-gradient-to-r from-blue-400 to-blue-950 image-full">
          {/* <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            <p className="font-bold text-4xl text-white">{dataList?.userCount?.length || 0}</p>
            <div className="card-actions justify-end">
              <button
                className="btn primary-btn px-10 rounded-full border-0"
                onClick={() =>
                  setSearchParams(
                    (prev) => {
                      prev.set('view', 'viewUsers');
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                View
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="views">
        <div className="max-w-full">
          {tabView === 'viewApprovals' ? (
            <OwnerApproval data={dataList?.pendingOwner} updateOwner={updateOwner} />
          ) : tabView === 'viewOwners' ? (
            <OwnerCount data={dataList?.approvedShops} updateOwner={updateOwner} />
          ) : tabView === 'viewShops' ? (
            <ShopCount data={dataList?.shopCount} updateOwner={updateOwner} />
          ) : tabView === 'viewUsers' ? (
            <UserCount data={dataList?.userCount} user={currentUser} setUpdateData={setUpdateData} />
          ) : (
            ''
          )}
        </div>
      </section>
    </div>
  );
}
