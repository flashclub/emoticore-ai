"use client";
import Link from "next/link";
// import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
import { px } from "framer-motion";
const Header = () => {
  return (
    <div className="sticky h-16 top-0 z-50 flex backdrop-blur-sm justify-between items-center shadow-md">
      <div className="container max-w-6xl  mx-auto flex  justify-between items-center">
        <nav className="w-full mx-auto flex  justify-between items-center">
          <div>
            <Link href="/" className="flex items-center">
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            {/* <LanguageSwitcher /> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
