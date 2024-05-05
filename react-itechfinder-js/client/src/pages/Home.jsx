import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import brgyList from '../hooks/brgy.js';
import gadgets from '../hooks/gadgets.js';
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const locationList = brgyList.sort((a, b) => (a.name > b.name ? 1 : -1));
  const [searchTerm, setSearchTerm] = useState({
    type: 'all',
    loc: 'all',
  });
  const urlParams = new URLSearchParams(window.location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();
    urlParams.set('type', searchTerm.type);
    urlParams.set('loc', searchTerm.loc);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleChange = (e) => {
    setSearchTerm({
      ...searchTerm,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="max-w-full mx-auto">
      <section
        id="hero"
        className="flex flex-col text-left gap-2 px-10 py-5 min-h-svh justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fbanner-top.png?alt=media&token=62166926-9269-4a87-af69-d1eb09bbe9b0')] bg-center bg-cover bg-no-repeat bg-blend-overlay bg-black/30"
      >
        <h1 className="text-5xl font-bold text-yellow-400">
          You deserve a device that works when you need it to.
        </h1>
        <p className="font-light text-xl text-white">Reliable repair for the device you depend on most.</p>
        {currentUser?.username ? (
          <Link to="/transaction">
            <span className="btn bg-yellow-500 border-0 text-white uppercase rounded-lg font-bold text-xl px-8 hover:bg-yellow-300 hover:text-black">
              Set an appointment
            </span>
          </Link>
        ) : (
          <Link to="/sign-up">
            <span className="btn bg-yellow-500 border-0 text-white uppercase rounded-lg font-bold text-xl px-8 hover:bg-yellow-300 hover:text-black">
              Get Started
            </span>
          </Link>
        )}
      </section>
      {/* <img
        className="object-cover w-full h-auto"
        src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fbanner-top.png?alt=media&token=62166926-9269-4a87-af69-d1eb09bbe9b0"
      /> */}
      <div className="p-3 mx-auto max-w-max">
        <div className="flex flex-col gap-4 my-20">
          <h1 className="header-text text-4xl text-center">Start a repair</h1>
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4">
            <label className="input input-bordered w-full max-w-xs flex items-center gap-2 p-5 bg-slate-100">
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
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>

              <select
                className="grow bg-slate-100"
                name="type"
                id="type"
                defaultValue={'DEFAULT'}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  What can we fix for you?
                </option>
                {gadgets?.map((gadgets) => (
                  <option key={gadgets.value} value={gadgets.value}>
                    {gadgets.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="input input-bordered w-full max-w-xs flex items-center gap-2 p-5 bg-slate-100">
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

              <select
                className="grow bg-slate-100"
                name="loc"
                id="loc"
                defaultValue={'DEFAULT'}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled>
                  Set your location
                </option>
                {locationList?.map((brgy) => (
                  <option key={brgy.value} value={brgy.value}>
                    {brgy.name}
                  </option>
                ))}
              </select>
            </label>
            {/* <label className="input input-bordered w-full max-w-xs flex items-center gap-2 p-5 bg-slate-100">
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

              <input type="text" className="grow bg-slate-100" id placeholder="Set your location" />
            </label> */}
            <button className="primary-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <section className="flex flex-col text-right justify-center gap-2 px-10 py-5 bg-cover bg-no-repeat min-h-96 bg-[url('https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fimg-2.png?alt=media&token=7086b691-b3fb-4f0f-85ef-51b4f5979842')]  bg-blend-overlay bg-black/50">
        <h1 className="text-5xl font-bold text-yellow-400">Fast repairs, right in your neighborhood</h1>
        <p className="font-light text-xl text-white">
          When things aren&apos;t going right, our technicials can help with any issue that you&apos;re facing
        </p>
        <Link to={currentUser?.username ? '/search' : '/sign-up'}>
          <span className="btn bg-transparent border-2 border-slate-200 text-white uppercase rounded-full font-bold text-xl px-8 hover:bg-slate-50 hover:text-black">
            Find a repair store
          </span>
        </Link>
      </section>
      {/* <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fbanner-top.png?alt=media&token=62166926-9269-4a87-af69-d1eb09bbe9b0')]"></div> */}
      {/* <div className="max-w-full mx-auto my-5">
        <img
          className="object-cover w-full h-auto"
          src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fimg-2.png?alt=media&token=7086b691-b3fb-4f0f-85ef-51b4f5979842"
          alt=""
        />
      </div> */}
      {/* <div className="max-w-6xl mx-auto my-5 text-center">
        <h1 className="header-text text-3xl mt-7">What can we fix for you?</h1>
        <div className="flex flex-row gap-1 lg:gap-4 lg:p-3 justify-center items-center">
          <div className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fmobile.png?alt=media&token=9aa3eaea-cbed-4101-9055-43e194ffbda0"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Smartphone</p>
          </div>
          <div className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fdesktop.png?alt=media&token=7398581d-2105-4715-89aa-ba60289628f1"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Desktop</p>
          </div>
          <div className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Flaptop.png?alt=media&token=ab533277-b660-4f2b-b9f6-8b795d685321"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Laptop</p>
          </div>
          <div className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fconsole.png?alt=media&token=730880bd-52d7-4fad-a7cd-cb14f1c4bba0"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Console</p>
          </div>
          <div className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fappliances.png?alt=media&token=5c5b1b7a-06e4-46b7-bab7-5042e3ef9715"
              className="menu-img"
              alt=""
            />
            <p className="text-md">
              <span>Appliances</span>
            </p>
          </div>
        </div>
      </div> */}
      <div className="max-w-6xl mx-auto my-5 text-center">
        <h1 className="header-text text-3xl mt-7">What can we fix for you?</h1>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 m-2">
          <Link to="/search?type=smartphone&loc=all" className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fmobile.png?alt=media&token=9aa3eaea-cbed-4101-9055-43e194ffbda0"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Smartphone</p>
          </Link>
          <Link to="/search?type=desktop&loc=all" className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fdesktop.png?alt=media&token=7398581d-2105-4715-89aa-ba60289628f1"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Desktop</p>
          </Link>
          <Link to="/search?type=laptop&loc=all" className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Flaptop.png?alt=media&token=ab533277-b660-4f2b-b9f6-8b795d685321"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Laptop</p>
          </Link>
          <Link to="/search?type=console&loc=all" className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fconsole.png?alt=media&token=730880bd-52d7-4fad-a7cd-cb14f1c4bba0"
              className="menu-img"
              alt=""
            />
            <p className="text-md">Console</p>
          </Link>
          <Link to="/search?type=appliances&loc=all" className="front-img">
            <img
              loading="lazy"
              src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fappliances.png?alt=media&token=5c5b1b7a-06e4-46b7-bab7-5042e3ef9715"
              className="menu-img"
              alt=""
            />
            <p className="text-md">
              <span>Appliances</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
