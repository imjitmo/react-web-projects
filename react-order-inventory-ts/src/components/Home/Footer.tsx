import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-slate-50 text-slate-950 min-h-[200px] flex flex-wrap flex-col gap-4 items-center p-4">
        <div className="flex flex-row flex-wrap gap-4 w-full items-center justify-center my-4">
          <div className="basis-1/4">
            <img
              src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/sign/assets/felicitas_logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZmVsaWNpdGFzX2xvZ28ucG5nIiwiaWF0IjoxNzE3OTcyMzgwLCJleHAiOjE3NDk1MDgzODB9.zRedt2ULJwA-J_DJpiGlAUau7rt7bhBcy7mY3jzE0Pw&t=2024-06-09T22%3A32%3A57.545Z"
              alt="felicitas"
              className="size-24"
            />
          </div>
          <div className="basis-2/3">
            <h3>Felicitas Steak House</h3>
            <ul>
              <li>
                <Link
                  to="homepage"
                  className="cursor-pointer "
                  activeClass="border-b border-slate-100"
                  smooth={true}
                  spy={true}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  className="cursor-pointer "
                  activeClass="border-b border-slate-100"
                  smooth={true}
                  spy={true}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="products"
                  className="cursor-pointer "
                  activeClass="border-b border-slate-100"
                  smooth={true}
                  spy={true}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="services"
                  className="cursor-pointer "
                  activeClass="border-b border-slate-100"
                  smooth={true}
                  spy={true}
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="w-full bg-slate-100 text-slate-950 text-center p-2 flex items-center justify-center">
        <p>© {new Date().getFullYear()} Felicitas Steakhouse. All rights reserved.</p>
      </div>
    </>
  );
};
export default Footer;
