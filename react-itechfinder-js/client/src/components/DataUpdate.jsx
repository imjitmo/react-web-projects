import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DataUpdate(props) {
  const { userData, setError } = props;
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/data/update/${userData?._id}`, {
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
      toast.success('Profile Updated!', { id: 'notifMsg', position: 'bottom-center' });
      setError(false);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-control">
          <label htmlFor="firstName" className="label font-bold">
            First Name
          </label>
          <input
            type="text"
            className="input input-bordered"
            id="firstName"
            value={formData?.firstName || userData?.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName" className="label font-bold">
            Last Name
          </label>
          <input
            type="text"
            className="input input-bordered"
            id="lastName"
            value={formData?.lastName || userData?.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">
              Contact Number{' '}
              <span className="text-sm italic text-slate-400 font-normal">Format: (+63 9xxxxxxxxx)</span>
            </span>
          </label>
          <div className="flex flex-row gap-2 items-center">
            <span>+63</span>
            <input
              type="tel"
              id="contactNumber"
              pattern="[0-9]{10}"
              min={10}
              max={10}
              value={formData?.contactNumber || userData?.contactNumber}
              placeholder="Contact Number"
              className="input input-bordered grow"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="userGender" className="label font-bold">
            Gender
          </label>
          <select
            className="select select-bordered"
            id="userGender"
            defaultValue={userData?.userGender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Other</option>
          </select>
        </div>
        <div className="form-control">
          <button className="btn primary-btn">Save</button>
        </div>
      </form>
    </div>
  );
}
