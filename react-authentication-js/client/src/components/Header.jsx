import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showNav, setShowNav] = useState(false);

  const navigationList = ['home', 'profile', 'about', 'sign in', 'sign up'];

  const navToggle = (e) => {
    e.target.checked ? setShowNav(true) : setShowNav(false);
  };
  const warning = 'Haha what are you doing? This is a console';

  console.log(warning);
  return (
    <>
      <div className="bg-slate-600">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
          <Link to="/">
            <h1 className="font-bold">OAuth App</h1>
          </Link>
          <ul className="gap-4 hidden lg:flex">
            <Link to="/">
              <li className="capitalize">Home</li>
            </Link>
            <Link to="/about">
              <li className="capitalize">About</li>
            </Link>
            {currentUser ? (
              <>
                <li className="dropdown">
                  <img
                    tabIndex={0}
                    role="button"
                    className="h-7 w-7 rounded-full object-cover dropdown"
                    src={currentUser.profilePicture}
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile">
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <a>Business</a>
                    </li>
                    <li>
                      <a>Sign out</a>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <li className="capitalize">Sign In</li>
                </Link>
                <Link to="/sign-up">
                  <li className="capitalize">Sign Up</li>
                </Link>
              </>
            )}
          </ul>
          <div className="lg:hidden">
            <label className="btn btn-circle bg-slate-600 border-0 swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={navToggle} />

              {/* hamburger icon */}
              <svg className="swap-off fill-current" width="32" height="32" viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg className="swap-on fill-current" width="32" height="32" viewBox="0 0 512 512">
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
        </div>

        <div className={showNav === true ? 'visible' : 'hidden'}>
          <ul className="text-center flex flex-col gap-4 p-4">
            {navigationList.map((navLink, i) => (
              <Link key={i} to={'/' + navLink}>
                <li className="capitalize" key={i}>
                  {navLink}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
