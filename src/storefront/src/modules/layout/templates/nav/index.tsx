import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import { BarsIcon } from "@modules/common/icons/bars"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import { useCart } from "medusa-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Nav = () => {
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { cart } = useCart()

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  const [fixedNav, setFixedNav] = useState(false)

  useEffect(() => {
    const fixed = () => {
      if (window.scrollY > 150) {
        setFixedNav(true)
      } else {
        setFixedNav(false)
      }
    }

    window.addEventListener("scroll", fixed)

    return () => {
      window.removeEventListener("scroll", fixed)
    }
  }, [setFixedNav])

  return (
    <header className={clsx(fixedNav ? "fixed" : "")}>
      <div className="annoncement-bar text-center">
        🚚 FREE SHIPPING on Orders Over $ 39/€ 36
      </div>

      <nav className="navbar navbar-expand-md navbar-light bg-white">
        <div className="px-5 flex items-center justify-between mx-auto max-w-7xl lg:max-w-[95vw] lg:px-10 py-4">
          <Link href="/">
            <a className="navbar-brand">
              Shopping
              <br /> Center
            </a>
          </Link>

          {/* navbar icons */}
          <div className="order-3 flex items-center gap-x-3 md:hidden">
            {/* <a className="srchbtn">
              <svg
                className=""
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="13"
                  cy="12"
                  r="7.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></circle>
                <path
                  d="M18.5 17.5L23 22.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </a> */}

            <a className="header-cart">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.10959 22L6 9H22L21.8904 22H6.10959Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 9V8C10 5.79086 11.7909 4 14 4V4C16.2091 4 18 5.79086 18 8V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="item-count">0</span>
            </a>

            <button
              className="p-2 border border-gray-200 rounded md:hidden self-auto"
              type="button"
              onClick={toggle}
            >
              <BarsIcon />
            </button>
          </div>

          <div className="hidden md:flex justify-between items-end h-full flex-1">
            {/* mobile navbar */}
            <div className="md:hidden">
              <a href="#">
                <svg
                  className=""
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.25 10C18.25 11.1942 17.7588 12.5346 16.9452 13.573C16.1293 14.6142 15.0759 15.25 14 15.25C12.9241 15.25 11.8707 14.6142 11.0548 13.573C10.2412 12.5346 9.75 11.1942 9.75 10C9.75 7.65279 11.6528 5.75 14 5.75C16.3472 5.75 18.25 7.65279 18.25 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M5.75 22.25V18.5856L12.6688 15.3055H15.3312L22.25 18.5856V22.25H5.75Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </a>
              <button
                className="navbar-close "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mynavbar"
                onClick={toggle}
              >
                X
              </button>
            </div>

            <ul className="flex items-center">
              <li className="text-gray-900/60 hover:text-gray-900  px-4">
                <Link href="/">
                  <span className="px-2 py-1 hover:cursor-pointer">Home</span>
                </Link>
              </li>
              {/* <li className="text-gray-900/60 hover:text-gray-900">
                <Link href="/collections">
                  <span className="px-2 py-1 hover:cursor-pointer">
                    Collection
                  </span>
                </Link>
              </li> */}
              <li className="text-gray-900/60 hover:text-gray-900 px-4">
                <Link href="/products">
                  <span className="px-2 py-1 hover:cursor-pointer">
                    All Products
                  </span>
                </Link>
              </li>
            </ul>

            <div className="flex header-right">
              {/* currency change */}
              {/* <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-white dropdown-toggle inline-flex items-center gap-x-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="body5 notranslate">£ GBP</span>
                  <svg
                    className="dropdown__icon--arrow"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.499919 0.550231L4.94967 4.99998L9.39941 0.550232"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>

                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    data-currency-code="GBP"
                    data-currency-symbol="£"
                  >
                    <span className="click">
                      <span className="body5 notranslate">£ GBP</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="USD"
                    data-currency-symbol="$"
                  >
                    <span className="click">
                      <span className="body5 notranslate">$ USD</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="EUR"
                    data-currency-symbol="€"
                  >
                    <span className="click">
                      <span className="body5 notranslate">€ EUR</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="CAD"
                    data-currency-symbol="$"
                  >
                    <span className="click">
                      <span className="body5 notranslate">$ CAD</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="AUD"
                    data-currency-symbol="A$"
                  >
                    <span className="click">
                      <span className="body5 notranslate">A$ AUD</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="INR"
                    data-currency-symbol="₹"
                  >
                    <span className="click">
                      <span className="body5 notranslate">₹ INR</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-currency-code="JPY"
                    data-currency-symbol="¥"
                  >
                    <span className="click">
                      <span className="body5 notranslate">¥ JPY</span>
                    </span>
                  </li>
                </ul>
              </div> */}

              {/* language change */}
              {/* <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-white dropdown-toggle inline-flex items-center gap-x-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>English</span>
                  <svg
                    className="dropdown__icon--arrow"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.499919 0.550231L4.94967 4.99998L9.39941 0.550232"
                      stroke="currentColor"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    data-alias="de"
                    data-name="Deutsch"
                  >
                    <span className="click">
                      <span className="body5 align-middle">Deutsch</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-alias="en"
                    data-name="English"
                  >
                    <span className="click">
                      <span className="body5 align-middle">English</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-alias="fr"
                    data-name="Français"
                  >
                    <span className="click">
                      <span className="body5 align-middle">Français</span>
                    </span>
                  </li>
                  <li
                    className="dropdown-item"
                    data-alias="ja"
                    data-name="日本語"
                  >
                    <span className="click">
                      <span className="body5 align-middle">日本語</span>
                    </span>
                  </li>
                  <li className="dropdown-item" data-alias="th" data-name="ไทย">
                    <span className="click">
                      <span className="body5 align-middle">ไทย</span>
                    </span>
                  </li>
                </ul>
              </div> */}

              {/* search button */}
              {/* <a href="#" className="srchbtn d-none d-md-block">
                <svg
                  className=""
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="13"
                    cy="12"
                    r="7.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M18.5 17.5L23 22.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </a> */}

              {/* user */}
              <Link href="/login">
                <a className="d-none d-md-block">
                  <svg
                    className=""
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.25 10C18.25 11.1942 17.7588 12.5346 16.9452 13.573C16.1293 14.6142 15.0759 15.25 14 15.25C12.9241 15.25 11.8707 14.6142 11.0548 13.573C10.2412 12.5346 9.75 11.1942 9.75 10C9.75 7.65279 11.6528 5.75 14 5.75C16.3472 5.75 18.25 7.65279 18.25 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M5.75 22.25V18.5856L12.6688 15.3055H15.3312L22.25 18.5856V22.25H5.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </a>
              </Link>

              {/* cart*/}
              <Link href="/cart">
                <span className="header-cart d-none d-md-block">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10959 22L6 9H22L21.8904 22H6.10959Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M10 9V8C10 5.79086 11.7909 4 14 4V4C16.2091 4 18 5.79086 18 8V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="item-count">{cart?.items.length ?? 0}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="header-search-container">
          <div className="header-search">
            <div className="container-fluid ">
              <div className="header-search-form">
                <button
                  data-id="header-drawer"
                  type="button"
                  className="header-search-btn j-stage-force-search"
                >
                  <svg
                    className=""
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="13"
                      cy="12"
                      r="7.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></circle>
                    <path
                      d="M18.5 17.5L23 22.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
                <input
                  placeholder="Type here to search"
                  className="header-search-input"
                />
              </div>
              <button
                type="button"
                className="srchbtn header-search-btn header-cancel-btn j-stage-search-close"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 20L20 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 8L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div> */}
      </nav>

      <MobileMenu />
    </header>
  )
}

export default Nav
