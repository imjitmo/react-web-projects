import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InformationCard from '../components/InformationCard.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import ProfileUpdate from '../components/ProfileUpdate.jsx';
import { app } from '../firebase/firebase.js';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/user.slice.js';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUplaodPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef(null);
  const [photoData, setPhotoData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imageName, setImageName] = useState(undefined);
  const [showImage, setShowImage] = useState(undefined);
  const [viewEdit, setViewEdit] = useState(false);

  useEffect(() => {
    if (image) {
      setImageName(image.name);
      setShowImage(URL.createObjectURL(image));
      // handleFileUpload(image);
    }
  }, [image]);

  useEffect(() => {
    if (photoData.profilePicture) {
      filePhotoUpdate();
    }
  }, [photoData.profilePicture]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${Math.floor(Math.random() * 10000).toString()}_${image.name}`;
    const storageRef = ref(storage, `profile_photo/${fileName}`);
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
          setPhotoData({ ...photoData, profilePicture: downloadURL })
        );
      }
    );
  };

  const filePhotoUpdate = async () => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setImage(undefined);
      setImageName(undefined);
      setShowImage(undefined);
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };

  const cancelUpload = () => {
    setImage(undefined);
    setImageName(undefined);
    setShowImage(undefined);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="header-text text-3xl my-7 text-center">Profile</h1>
      <div className="flex flex-col gap-4 my-5">
        <input
          type="file"
          name="picture"
          id="picture"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          key={image}
          hidden
        />
        <img
          src={showImage || photoData.profilePicture || currentUser.profilePicture}
          alt="profile_picture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error uploading image...</span>
          ) : uploadPercent > 0 && uploadPercent < 100 ? (
            <span className="text-slate-400">Uploading: {uploadPercent}%</span>
          ) : uploadPercent === 100 && updateSuccess ? (
            <span className="text-green-700">Photo updated successfully</span>
          ) : (
            imageName && imageName
          )}
        </p>
        {showImage && (
          <p className="flex gap-4 justify-center">
            <button
              className="bg-transparent text-green-500 text-sm italic rounded-lg hover:text-green-600 disabled:opacity-50"
              onClick={() => handleFileUpload(image)}
              disabled={loading}
            >
              Upload
            </button>
            <button
              className="bg-transparent text-red-500 text-sm italic rounded-lg hover:text-red-600 disabled:opacity-50"
              onClick={cancelUpload}
              disabled={loading}
            >
              Cancel
            </button>
          </p>
        )}
      </div>
      {viewEdit ? <ProfileUpdate /> : <ProfileCard />}
      <div className="flex justify-between mt-3">
        <button
          className="text-green-500"
          hidden={viewEdit}
          onClick={() => setViewEdit((prevState) => !prevState)}
        >
          Update Information
        </button>
        <button
          className="text-red-500"
          hidden={!viewEdit}
          onClick={() => setViewEdit((prevState) => !prevState)}
        >
          Cancel
        </button>
      </div>
      <div className="mt-7">
        <InformationCard />
      </div>
      {/* <div className="flex flex-col my-2">
        <button className="primary-btn uppercase">Edit Information</button>
      </div> */}
    </div>
  );
}
