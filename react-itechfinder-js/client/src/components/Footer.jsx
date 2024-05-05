import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer p-10 bg-gradient-to-br from-slate-600 to-slate-900 text-white">
        <aside>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itechfinder-4502f.appspot.com/o/page_photo%2Fitechfinder.svg?alt=media&token=2b8bcec1-9fdb-4370-813a-90778f6f8920"
            className="w-14 h-auto"
            alt="itechfinderlogo"
          />
          <p>
            iTechFinder
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/search" className="link link-hover">
            Find Store
          </Link>
          {/* <a className="link link-hover">Shop</a>
          <a className="link link-hover">Permit</a>
          <a className="link link-hover">Advertisement</a> */}
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/about" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
          {/* <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a> */}
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}
