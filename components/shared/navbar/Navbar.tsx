"use client";

import { useState, useEffect } from "react";
import { SafeUser } from "@/types";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import Search from "./Search";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const navbar = document.getElementById("navbar");
        if (navbar) {
          const navbarRect = navbar.getBoundingClientRect();
          setIsSticky(navbarRect.top <= 0);
        }
      } else {
        setIsSticky(false); // Reset for larger screens
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // <nav className="w-full md:fixed md:top-0 md:z-10 md:bg-white shadow-none border-none">
    <nav className="md:fixed  z-10 bg-white shadow-none md:shadow-none border-none  w-full ">
      <div className="py-4 md:py-10 border-none">
        <div className="main-container">
          {/* Mobile-specific logo: Centered above the search bar */}
          <div className="block md:hidden flex justify-center mb-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Airbnb Logo"
                width={80}
                height={80}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>

          <div
            id="navbar"
            className={`  ${
              isSticky ? "fixed top-0 z-20 w-full bg-white shadow-none pr-7" : ""
            }`}
          >
            {/* Flex container for search and user menu - Same row for all screens */}
            <div className="flex items-center justify-between gap-3 md:gap-0 bg-white py-5 md:py-0">
              {/* Desktop logo remains in the same place */}
              <div className="hidden md:block">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Airbnb Logo"
                    width={100}
                    height={100}
                    className="object-contain cursor-pointer"
                  />
                </Link>
              </div>

              <Search />

              <div className="relative">
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
        <div
            id="navbar"
            className={`  ${
              isSticky ? "fixed top-[10%]  z-10 w-full bg-white shadow-md ml-0" : ""
            }`}
          >
        {/* <div className="mt-2 md:mt-4"> */}
          <Categories />
        {/* </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
