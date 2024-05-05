import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { app } from '../firebase/firebase.js';
import brgyList from '../hooks/brgy.js';
import gadgets from '../hooks/gadgets';
import storeType from '../hooks/storeType';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/user.slice.js';
import MapSetup from './MapSetup.jsx';

export default function StoreSetup() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showSetup, setShowSetup] = useState(false);
  const animatedComponents = makeAnimated();
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUplaodPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const locationList = brgyList.sort((a, b) => (a.name > b.name ? 1 : -1));
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${Math.floor(Math.random() * 10000).toString()}_${image.name}`;
    const storageRef = ref(storage, `docs_photo/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUplaodPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, permitPhoto: downloadURL })
        );
      }
    );
  };

  const handleGadgetChange = (selectedGadgets) => {
    const finalGadgetList = selectedGadgets.map((item) => item.value);
    setFormData({ ...formData, gadgetList: finalGadgetList });
  };
  const handleStoreChange = (selectedStores) => {
    const finalStoreList = selectedStores.map((store) => store.value);
    setFormData({ ...formData, shopType: finalStoreList });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.permitPhoto || formData.permitPhoto === undefined || formData.permitPhoto === '') {
      toast.error('Please upload a permit photo', {
        id: 'errMsg',
        position: 'bottom-center',
      });
      return;
    }
    if (!formData?.permitPhoto) {
      toast.error('Please upload a permit photo', {
        id: 'errMsg',
        position: 'bottom-center',
      });
      return;
    }
    if (!formData?.geoCode) {
      toast.error('Please pin your location to continue', {
        id: 'errMsg',
        position: 'bottom-center',
      });
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/store/setup/${currentUser._id}/${currentUser.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success('You have successfully setup your store!', { id: 'strMsg', position: 'bottom-left' });
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
    }
  };
  const locationChange = (geocode) => {
    setFormData({ ...formData, geoCode: geocode });
  };

  return (
    <div>
      <h1 className="header-text text-3xl text-center my-7">My Shop</h1>
      <div className="flex flex-col gap-4 my-5">
        {showSetup && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <section id="forShopName" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">Shop&apos;s Name</span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>

                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  className="grow"
                  placeholder="Shop's name"
                  onChange={handleChange}
                  required
                />
              </label>
            </section>
            <section id="forOwnerName" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">Owner&apos;s Name</span>
              <label className="input input-bordered flex items-center gap-2">
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="grow"
                  placeholder="Owner's name"
                  onChange={handleChange}
                  required
                />
              </label>
            </section>
            <section id="forStoreType" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">Store Type(Retail or Repair)</span>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isClearable={true}
                isMulti
                options={storeType}
                onChange={handleStoreChange}
                id="shopType"
                placeholder="Store Type"
                required
              />
            </section>
            <section id="forGadgetList" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">Gadget Lists</span>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isClearable={true}
                isMulti
                options={gadgets}
                id="gadgetList"
                onChange={handleGadgetChange}
                placeholder="Select Gadgets"
                required
              />
            </section>
            <section id="forShopAddress" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">Shop&apos;s Address</span>
              <div className="flex flex-row gap-2 items-center">
                <label className="input input-bordered flex items-center gap-2">
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
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <input
                    type="text"
                    id="shopStreet"
                    className="grow"
                    placeholder="Street"
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <select
                    name="shopBarangay"
                    id="shopBarangay"
                    className="select select-bordered grow"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Barangay</option>
                    {locationList.map((brgy) => (
                      <option key={brgy.value} value={brgy.value}>
                        {brgy.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>
            <section id="forPermitNo" className="flex flex-col gap-2">
              <span className="text-xs font-semibold italic pl-2">DTI Permit #</span>
              <label className="input input-bordered flex items-center gap-2">
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
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>

                <input
                  type="text"
                  id="permitNo"
                  className="grow"
                  placeholder="DTI Permit #"
                  onChange={handleChange}
                  required
                />
              </label>
            </section>
            <section id="forPermitDocs">
              <label className="flex flex-col gap-2">
                <span className="uppercase text-sm font-bold">Upload DTI Permit</span>
                <input
                  type="file"
                  id="permitPhoto"
                  className="file-input file-input-primary grow"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <span className="text-xs font-semibold italic">JPEG, JPG, PNG (Max: 4.00 MB) only</span>
              <p className="text-sm self-center">
                {uploadError ? (
                  <span className="text-red-700">Error uploading image...</span>
                ) : uploadPercent > 0 && uploadPercent < 100 ? (
                  <span className="text-slate-400">Uploading: {uploadPercent}%</span>
                ) : uploadPercent === 100 ? (
                  <span className="text-green-700">Document uploaded successfully!</span>
                ) : (
                  ''
                )}
              </p>
              <div className="flex flex-col gap-2 py-4">
                <span>
                  <strong>Social Links:</strong>
                </span>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032"
                      className="size-6"
                      alt="facebook"
                    />

                    <input
                      type="text"
                      id="facebook"
                      className="grow"
                      placeholder="facebook"
                      value={formData?.facebook || 'https://www.facebook.com/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622"
                      className="size-6"
                      alt="instagram"
                    />

                    <input
                      type="text"
                      id="instagram"
                      className="grow"
                      placeholder="instagram"
                      value={formData?.instagram || 'https://www.instagram.com/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
                      className="size-6"
                      alt="twitter"
                    />

                    <input
                      type="text"
                      id="twitter"
                      className="grow"
                      placeholder="twitter"
                      value={formData?.twitter || 'https://www.twitter.com/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://www.svgrepo.com/show/333611/tiktok.svg"
                      className="size-6"
                      alt="tiktok"
                    />

                    <input
                      type="text"
                      id="tiktok"
                      className="grow"
                      placeholder="tiktok"
                      value={formData?.tiktok || 'https://www.tiktok.com/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/512px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800"
                      className="size-6"
                      alt="youtube"
                    />

                    <input
                      type="text"
                      id="youtube"
                      className="grow"
                      placeholder="youtube"
                      value={formData?.youtube || 'https://www.youtube.com/channel/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input input-bordered flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/72px-LinkedIn_icon.svg.png?20210220164014"
                      className="size-6"
                      alt="linkedin"
                    />

                    <input
                      type="text"
                      id="linkedin"
                      className="grow"
                      placeholder="linkedin"
                      value={formData?.linkedin || 'https://www.linkedin.com/'}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="py-4">
                <strong>Set Location:</strong>
              </div>
              <div className="flex items-center justify-center">
                <MapSetup locationChange={locationChange} storePosition={undefined} />
              </div>
            </section>
            <section id="forButton">
              <div className="flex flex-col lg:flex-row gap-2">
                <span
                  className="google-btn w-full lg:w-32"
                  onClick={() => setShowSetup((prevState) => !prevState)}
                >
                  Cancel
                </span>
                <button
                  className="primary-btn grow order-first lg:order-last lg:flex-auto"
                  disabled={loading}
                >
                  {loading ? <span className="loading loading-dots loading-xs"></span> : 'Setup'}
                </button>
              </div>
              <div className="flex mt-5">
                <p className="text-red-700">{error && 'Something went wrong'}</p>
              </div>
            </section>
          </form>
        )}
        <button
          className={`primary-btn ${showSetup && 'hidden'}`}
          onClick={() => setShowSetup((prevState) => !prevState)}
        >
          Setup Shop
        </button>
      </div>
    </div>
  );
}
