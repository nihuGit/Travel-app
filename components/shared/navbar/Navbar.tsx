'use client';

import { useRef, useState, useEffect } from "react";
import { SafeUser } from "@/types";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import Search from "./Search";
import FilterButton from "./FilterButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const navbar = document.getElementById("navbar");
        if (navbar) {
          const navbarRect = navbar.getBoundingClientRect();
          setIsSticky(navbarRect.top <= 0);
        }
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (!categoriesRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (categoriesRef.current) {
      handleScroll();
      categoriesRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (categoriesRef.current) {
        categoriesRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <nav className="md:fixed z-10 bg-white shadow-none md:shadow-none border-none w-full">
      <div className="py-4 md:py-10 border-none">
        <div className="main-container">
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
            className={`${
              isSticky
                ? "fixed top-0 z-20 w-full bg-white shadow-none pr-7"
                : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3 md:gap-0 bg-white py-5 md:py-0">
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
                {isMobile ? (
                  <FilterButton />
                ) : (
                  <UserMenu currentUser={currentUser} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          id="navbar"
          className={`${
            isSticky
              ? "fixed top-[10%] z-10 w-full bg-white shadow-md ml-0"
              : "shadow-md"
          }`}
        >
          <div className="flex md:w-4/5 mx-auto items-center justify-center md:pt-5  px-4 md:px-8">
            {/* Left Arrow */}
            <button
              style={{
                transition: "all 0.3s ease-in-out",
                opacity: canScrollLeft ? 1 : 0.5,
                cursor: canScrollLeft ? "pointer" : "not-allowed",
              }}
              className="hidden md:block p-2 bg-white border rounded-full shadow-md"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <FaChevronLeft size={18} />
            </button>

            {/* Categories Container */}
            <div
              ref={categoriesRef}
              className="flex overflow-x-auto md:overflow-x-hidden items-center"
              onScroll={handleScroll}
            >
              <Categories />
            </div>

            {/* Right Arrow */}
            <button
              style={{
                transition: "all 0.3s ease-in-out",
                opacity: canScrollRight ? 1 : 0.5,
                cursor: canScrollRight ? "pointer" : "not-allowed",
              }}
              className="hidden md:block p-2 bg-white border rounded-full shadow-md ml-4"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <FaChevronRight size={18} />
            </button>

            {/* Filter Button (Outside Scroll & Right Arrow) */}
            <div className="hidden md:block ml-10">
              <FilterButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
