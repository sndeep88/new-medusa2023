import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="pt-5">
      <div className="container-fluid footer-top">
        <div className="row">
          <div className="col-md-6 pb-4">
            <h5>HELP CENTER</h5>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link">Collections</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">All products</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 pb-4">
            <h5>SITE INFO</h5>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Cotact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Terms of Service</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-12 mb-5">
            <h5 className="mb-[20px]">
              Subscribe today and get 10% off your first purchase
            </h5>
            <div className="footer__newsletter-input">
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
      <div className="container-fluid pt-0 pt-md-5">
        <div className="row p-2 p-md-4">
          <div className="col-md-6">
            <p className="footer__copyright text-center text-md-start">
              © 2023 Shopping Center
            </p>
          </div>
          <div className="col-md-6 payment-icon text-center text-md-end inline-flex items-start justify-end gap-x-2">
            <Image
              src="/assets/images/american_express.svg"
              alt="american_express"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/diners_club.svg"
              alt="diners_club"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/discover.svg"
              alt="discover"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/jcb.svg"
              alt="jcb"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/master.svg"
              alt="master"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/visa.svg"
              alt="visa"
              height={22}
              width={35}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
