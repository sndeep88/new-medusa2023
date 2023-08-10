import Link from "next/link"

const Footer = () => {
  return (
    <footer className="pt-5">
      <div className="flex items-center py-5">
        <div className="mx-auto flex flex-col md:flex-row items-start justify-between w-full px-5 md:px-10 lg:px-18">
          <div className="col-md-6 col-lg-4 pb-4">
            <h5 className="font-bold text-lg text-gray-900 mb-5">
              HELP CENTER
            </h5>
            <ul className="navbar-nav me-auto mt-0">
              <li className="py-2">
                <Link className="nav-link" href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              {/* <li className="py-2">
                <a className="nav-link">Collection</a>
              </li> */}
              <li className="py-2">
                <Link href="products">
                  <a className="nav-link">All Products</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 pb-4">
            <h5 className="font-bold text-lg text-gray-900 mb-5">SITE INFO</h5>
            <ul className="navbar-nav me-auto">
              <li className="py-2">
                <a className="nav-link">About Us</a>
              </li>
              <li className="py-2">
                <a className="nav-link">Cotact Us</a>
              </li>
              <li className="py-2">
                <a className="nav-link">Terms of Service</a>
              </li>
              <li className="py-2">
                <a className="nav-link">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-12 col-lg-4 mb-5">
            <h5 className="font-bold text-lg text-gray-900 mb-5">NEWSLETTER</h5>
            <h6 className="mt-3">
              Subscribe today and get 10% off your first purchase
            </h6>
            <div className="footer__newsletter-input mt-3">
              <input className="" type="text" placeholder="Enter your email" />
              <button className="newsletter-btn has-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="1.5" y="3.5" width="17" height="13" rx="0.5"></rect>
                  <path d="M1.5 6L8.98596 10.4035C9.61186 10.7717 10.3881 10.7717 11.014 10.4035L18.5 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3">
        <div className="flex flex-col md:flex-row gap-y-3 items-center justify-between px-5 md:px-10 lg:px-18">
          <div className="col-md-6">
            <p className="footer__copyright text-center text-md-start">
              © 2023 Shopping Center
            </p>
          </div>
          <div className="col-md-6 payment-icon text-center text-md-end md:ml-auto inline-flex items-center justify-center md:justify-end">
            <img
              src="/assets/images/american_express.svg"
              alt="american_express"
            />
            <img src="/assets/images/diners_club.svg" alt="diners_club" />
            <img src="/assets/images/discover.svg" alt="discover" />
            <img src="/assets/images/jcb.svg" alt="jcb" />
            <img src="/assets/images/master.svg" alt="master" />
            <img src="/assets/images/visa.svg" alt="visa" />
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
