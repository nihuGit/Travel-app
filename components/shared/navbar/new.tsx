// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import UserMenu from "./UserMenu";
// import Categories from "./Categories";
// import Search from "./Search";
// import { SafeUser } from "@/types";

// interface NavbarProps {
//   currentUser?: SafeUser | null;
// }

// const Navbar = ({ currentUser }: NavbarProps) => {
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerWidth < 768) {
//         const navbar = document.getElementById("navbar");
//         if (navbar) {
//           const navbarRect = navbar.getBoundingClientRect();
//           setIsSticky(navbarRect.top <= 0);
//         }
//       } else {
//         setIsSticky(false); // Reset for larger screens
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className="w-full md:fixed md:top-0 md:z-10 md:bg-white shadow-none border-none">
//       <div className="py-4 md:py-10">
//         <div className="main-container">
//           {/* Mobile logo: Centered above the search bar */}
//           <div className="block md:hidden flex justify-center mb-4">
//             <Link href="/">
//               <Image
//                 src="/images/logo.png"
//                 alt="Airbnb Logo"
//                 width={80}
//                 height={80}
//                 className="object-contain cursor-pointer"
//               />
//             </Link>
//           </div>

//           {/* Sticky container for Search Bar + UserMenu + Categories */}
//           <div
//             id="navbar"
//             className={`${
//               isSticky ? "fixed top-0 z-20 w-full bg-white shadow-sm" : ""
//             }`}
//           >
//             {/* Search Bar and User Menu */}
//             <div className="flex items-center justify-between gap-3 md:gap-0 bg-white">
//               {/* Desktop logo */}
//               <div className="hidden md:block">
//                 <Link href="/">
//                   <Image
//                     src="/images/logo.png"
//                     alt="Airbnb Logo"
//                     width={100}
//                     height={100}
//                     className="object-contain cursor-pointer"
//                   />
//                 </Link>
//               </div>

//               <Search />

//               <div className="relative">
//                 <UserMenu currentUser={currentUser} />
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="mt-2 bg-white">
//               <Categories />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
