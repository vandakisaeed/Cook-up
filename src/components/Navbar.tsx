"use client";
import Link from "next/link";
import { useState } from "react";
import type { FC } from "react";

const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-orange-500">🍳 Recipe Center</h1>
      <ul className="flex gap-8 items-center">
        <li>
          <Link href="/" className="text-gray-700 hover:text-orange-500 transition font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-gray-700 hover:text-orange-500 transition font-medium">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition font-medium">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;