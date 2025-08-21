import Logo from "@/public/logo1.svg";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import HeaderActions from "./HeaderActions";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center max-h-12">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 100"
    className="h-12 w-auto text-black dark:text-white"
  >
    <defs>
      <linearGradient id="flameGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff4d00" />
        <stop offset="50%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#6a00ff" />
      </linearGradient>
    </defs>
    <path
      d="M40 80 C20 50, 50 20, 40 0 C70 30, 70 60, 40 80 Z"
      fill="url(#flameGradient)"
    />
    <path
      d="M40 80 C30 60, 45 40, 35 20 C55 35, 55 55, 40 80 Z"
      fill="url(#flameGradient)"
      opacity="0.8"
    />
    <text
      x="90"
      y="65"
      fontFamily="Arial, sans-serif"
      fontSize="40"
      fontWeight="600"
      fill="currentColor"
    >
      Finovo
    </text>
  </svg>
</Link>

        <HeaderActions />
      </nav>
    </header>
  );
};

export default Header;