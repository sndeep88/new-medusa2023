import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Container from "@modules/mobile-menu/components/container"
import MainMenu from "@modules/mobile-menu/components/main-menu"
import CountryMenu from "../components/country-menu"
import SearchMenu from "../components/search-menu"
import Link from "next/link"

// const MobileMenu = () => {
//   const {
//     screen: [currentScreen],
//   } = useMobileMenu()

//   return (
//     <Container>
//       <div className="flex flex-col flex-1">
//         {(() => {
//           switch (currentScreen) {
//             case "country":
//               return <CountryMenu />
//             case "search":
//               return <SearchMenu />
//             default:
//               return <MainMenu />
//           }
//         })()}
//       </div>
//     </Container>
//   )
// }

const MobileMenu = () => {
  const {
    screen: [currentScreen],
    toggle,
  } = useMobileMenu()

  return (
    <Container>
      <div className="w-full flex flex-col items-start px-4">
        <div className="w-full flex items-center justify-between px-2 py-4 border-b border-gray-300">
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

        <ul className="flex flex-col items-start py-3 w-full border-b border-gray-300">
          <li className="text-gray-900/60 hover:text-gray-900 py-2 text-base ">
            <Link href="/">
              <span className="hover:cursor-pointer" onClick={toggle}>
                Home
              </span>
            </Link>
          </li>
          {/* <li className="text-gray-900/60 hover:text-gray-900">
                <Link href="/collections">
                  <span className="hover:cursor-pointer">
                    Collection
                  </span>
                </Link>
              </li> */}
          <li className="text-gray-900/60 hover:text-gray-900 py-2 text-base ">
            <Link href="/products" onClick={toggle}>
              <span className="hover:cursor-pointer" onClick={toggle}>
                All Products
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default MobileMenu
