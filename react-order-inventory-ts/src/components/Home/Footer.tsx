import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-slate-50 text-slate-950 min-h-[200px] flex flex-wrap flex-col">
        <div className="flex flex-col md:flex-row gap-4 w-full justify-start items-start md:items-center md:justify-center my-4 p-2">
          <div className="basis-1/4">
            <img
              src="https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/sign/assets/felicitas_logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZmVsaWNpdGFzX2xvZ28ucG5nIiwiaWF0IjoxNzE3OTcyMzgwLCJleHAiOjE3NDk1MDgzODB9.zRedt2ULJwA-J_DJpiGlAUau7rt7bhBcy7mY3jzE0Pw&t=2024-06-09T22%3A32%3A57.545Z"
              alt="felicitas"
              className="size-24"
            />
          </div>
          <div className="basis-1/3">
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
          <div className="basis-1/4">
            <h3>We are located at:</h3>
            <p>Block 15 #810, National Road, Mariveles, Philippines, 2105</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15455.470793837527!2d120.4791879!3d14.4347871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33961915edee2bd3%3A0xde12679a496d4b5b!2sFelicitas%20Steak%20House!5e0!3m2!1sen!2sph!4v1717990954331!5m2!1sen!2sph"
              style={{ border: '0', borderRadius: '10px' }}
              loading="lazy"
              className="w-full h-60"
            ></iframe>
          </div>
        </div>
        <div className="w-full bg-slate-100 text-slate-950 text-center p-2 flex items-center justify-center">
          <p>© {new Date().getFullYear()} Felicitas Steakhouse. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
