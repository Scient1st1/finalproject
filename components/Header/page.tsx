"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/Auth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/home">
            <Image src="/cinema.jpg" alt="Logo" width={70} height={70} />
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="/home" className="text-gray-700 hover:text-indigo-600">
              მთავარი
            </Link>
            <Link
              href="/favourites"
              className="text-gray-700 hover:text-indigo-600"
            >
              ფავორიტები
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {user && <span className="text-gray-700">Welcome, {user.name}</span>}
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
