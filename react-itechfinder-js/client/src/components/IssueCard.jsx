import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';

import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { brands } from '../hooks/brands.js';

export default function IssueCard(props) {
  const { shopData, userData } = props;
  const brandLists = brands.sort((a, b) => (a.name > b.name ? 1 : -1));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: userData?.userId,
    username: userData?.username,
    fullname: `${userData?.firstName} ${userData?.lastName}`,
    shopId: shopData?._id,
    shopName: shopData?.shopName,
    shopAddress: `${shopData?.shopAddress.shopStreet}, ${shopData?.shopAddress.shopBarangay}, ${shopData?.shopAddress.shopCity}, ${shopData?.shopAddress.shopProvince}`,
    ownerId: shopData?.userId,
    contactNumber: `+63${userData?.contactNumber}`,
  });

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/appointment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) {
        return;
      }
      toast.success('Appointment Scheduled!', { id: 'issMsg', position: 'bottom-left' });
      navigate('/transactions');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body flex flex-col gap-4 justify-center items-center">
        <h2 className="card-title">Issue Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label">Device</label>
            <select
              id="device"
              className="select select-bordered"
              defaultValue={'DEFAULT'}
              onChange={handleChange}
            >
              <option disabled value="DEFAULT">
                Select your device
              </option>
              {shopData?.gadgetList.map((list, i) => (
                <option key={i} value={list} className="capitalize">
                  {list}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control flex flex-row gap-2">
            <div
              className={`flex-1 ${!formData?.device && 'tooltip'}`}
              data-tip="Please select your device first"
            >
              <label className="label">Brand</label>
              {/* <input
                type="text"
                id="brand"
                placeholder="Brand"
                className="input input-bordered grow"
                onChange={handleChange}
                required
              /> */}
              <select
                id="brand"
                className="select select-bordered"
                onChange={handleChange}
                defaultValue={'DEFAULT'}
                disabled={!formData?.device}
              >
                <option key={1} disabled value="DEFAULT">
                  Select your brand
                </option>
                {brandLists
                  ?.filter((item) => item.type === formData?.device)
                  .map((list, i) => (
                    <option key={i} value={list.value}>
                      {list.name}
                    </option>
                  ))}
              </select>
            </div>
            <div
              className={`flex-1 ${!formData?.device && 'tooltip'}`}
              data-tip="Please select your brand first"
            >
              <label className="label">Model</label>
              <input
                type="text"
                id="model"
                placeholder="Model"
                className="input input-bordered grow"
                onChange={handleChange}
                required
                disabled={!formData?.brand}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Describe the issue</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 resize-none"
              id="description"
              placeholder="Description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Appointment Date</span>
            </label>
            <DatePicker
              className="btn"
              placeholderText="Set Date"
              selected={formData?.appointmentDate}
              showTimeSelect
              dateFormat="MMMM d, YYYY h:mm a"
              minDate={new Date()}
              filterTime={filterPassedTime}
              maxDate={new Date().setDate(new Date().getDate() + 14)}
              onChange={(date) => setFormData({ ...formData, appointmentDate: date })}
              required
            />
          </div>
          <div className="card-actions justify-end">
            <Link to="/search" className="btn google-btn">
              Cancel
            </Link>
            <button className="btn primary-btn">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
}
