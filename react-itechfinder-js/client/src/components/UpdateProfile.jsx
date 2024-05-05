import { useState } from 'react';
import { useSelector } from 'react-redux';
export default function UpdateProfile(props) {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/data/new/${currentUser._id}&${currentUser.username}`, {
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
      await props?.setError(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body max-w-lg">
        <h2 className="card-title">Profile Update</h2>
        <figure>
          <img src={currentUser.profilePicture} alt="Movie" className="object-scale-down size-32" />
        </figure>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              className="input input-bordered grow"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              className="input input-bordered grow"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered grow"
              id="userGender"
              onChange={handleChange}
              defaultValue={'DEFAULT'}
              required
            >
              <option disabled value={'DEFAULT'}>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Contact Number <span className="text-sm italic text-slate-400">Format: (+63 9xxxxxxxxx)</span>
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
                placeholder="Contact Number"
                className="input input-bordered grow"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className="btn primary-btn">Save</button>
        </form>
      </div>
    </div>
  );
}
