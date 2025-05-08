import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-slate-50 text-slate-950 min-h-[200px] flex flex-wrap flex-col">
        <div className="flex flex-col md:flex-row gap-4 w-full justify-start items-start md:items-center md:justify-center my-4 p-2">
          <div className="basis-1/4">
            <div className="w-12 h-12 flex flex-col mb-2">
              <h1 className="text-4xl font-bold flex flex-row gap-2">
                SOFTNET <span className="text-blue-900">HOTEL</span>
              </h1>
              <p className="text-md w-100 text-blue-900">Experience The Art of Hospitality</p>
            </div>
          </div>
          <div className="basis-1/3">
            <h3 className="text-xl font-bold">LINKS</h3>
            <ul>
              <li>
                <Link
                  to="homepage"
                  className="cursor-pointer hover:text-blue-900"
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
                  className="cursor-pointer hover:text-blue-900"
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
                  className="cursor-pointer hover:text-blue-900"
                  activeClass="border-b border-slate-100"
                  smooth={true}
                  spy={true}
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="services"
                  className="cursor-pointer hover:text-blue-900"
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
            <p>2nd Flr. SFB No. 8 Bldg., Mariveles, Philippines</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.8280744256513!2d120.4944206!3d14.437069600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33961f2adf4b0b11%3A0x18be54a6ca5d7404!2sSOFTNET%20Information%20Technology%20Center!5e0!3m2!1sen!2sph!4v1746232937753!5m2!1sen!2sph"
              style={{ border: '0', borderRadius: '10px' }}
              loading="lazy"
              className="w-full h-60"
            ></iframe>
          </div>
        </div>
        <div className="w-full bg-slate-100 text-slate-950 text-center p-2 flex items-center justify-center">
          <p>© {new Date().getFullYear()} SOFTNET Hotel. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
