import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function StoreCard() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shopProfile, setShopProfile] = useState();
  const [updateStore, setUpdateStore] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/store/shop/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setShopProfile(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="header-text text-3xl my-7 text-center">My Shop</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <p className="capitalize font-bold">Shop&apos;s Name:</p>{' '}
              <input
                type="text"
                className="input input-bordered capitalize font-normal italic grow disabled:opacity-100  disabled:bg-none"
                value={shopProfile?.shopName}
                disabled={!updateStore}
                required
              />
            </div>
            <div className="form-control">
              <label className="capitalize font-bold">Owner&apos;s Name:</label>
              <input
                type="text"
                className="input input-bordered capitalize font-normal italic grow disabled:opacity-100  disabled:bg-none"
                value={shopProfile?.ownerName}
                disabled={!updateStore}
                required
              />
            </div>
            <p className="capitalize font-bold">
              Username: <span className="capitalize font-normal italic">{shopProfile?.username}</span>
            </p>
            <div className="form-control">
              <label className="capitalize font-bold">Address:</label>
              <div className="flex flex-row gap-1">
                <input
                  type="text"
                  className="input input-bordered capitalize font-normal italic grow  disabled:opacity-100  disabled:bg-none"
                  id=""
                  value={shopProfile?.shopAddress.shopStreet}
                  disabled={!updateStore}
                  required
                />

                <select
                  className="select select-bordered capitalize font-normal italic grow disabled:opacity-100 disabled:bg-none"
                  disabled={!updateStore}
                  required
                >
                  <option value={shopProfile?.shopAddress.shopBarangay}>
                    {' '}
                    {shopProfile?.shopAddress.shopBarangay}
                  </option>
                </select>
              </div>
            </div>
            <p className="capitalize font-bold flex flex-row gap-1 items-center">
              Shop Type:
              {shopProfile?.shopType.map((type) => (
                <span
                  key={type}
                  className="capitalize italic font-normal bg-blue-500 px-2 rounded-lg text-white cursor-pointer"
                >
                  {type}
                </span>
              ))}
            </p>
            <p className="capitalize font-bold flex flex-row gap-1 items-center">
              Gadget Lists:
              {shopProfile?.gadgetList.map((list) => (
                <span
                  key={list}
                  className="capitalize italic font-normal bg-blue-700 px-2 rounded-lg text-white cursor-pointer"
                >
                  {list}
                </span>
              ))}
            </p>
            <div className="form-control">
              <label className="capitalize font-bold">Permit No.:</label>
              <input
                type="text"
                className="input input-bordered uppercase font-normal italic disabled:opacity-100  disabled:bg-none"
                value={shopProfile?.permitNo}
                disabled={!updateStore}
              />
            </div>
            {updateStore && (
              <div className="form-control">
                <label className="capitalize font-bold">Permit:</label>
                <input
                  type="file"
                  className="file file-input-bordered font-normal italic disabled:opacity-100  disabled:bg-none"
                  disabled
                />
              </div>
            )}
            <p className="capitalize font-bold">
              Status:{' '}
              <span className="capitalize font-normal italic">
                {shopProfile && shopProfile?.isApproved ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </span>
            </p>
            {shopProfile && shopProfile?.isRepeat && (
              <p className="capitalize font-bold">
                Reason:{' '}
                <span className="capitalize font-normal italic">
                  <span className="text-red-600">{shopProfile?.repeatReason}</span>
                </span>
              </p>
            )}
            {updateStore && (
              <div className="form-control">
                <button className="btn primary-btn" onClick={() => setUpdateStore(false)}>
                  Save
                </button>
              </div>
            )}
          </form>
          <div className="w-full py-4">
            {shopProfile && !updateStore && !shopProfile?.isApproved && (
              <button className="btn primary-btn w-full" onClick={() => setUpdateStore(true)}>
                Update
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
