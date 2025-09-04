"use client";
import Link from "next/link";
import { useState } from "react";
import type { FC } from "react";

const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Recipe Center</h1>
      <ul className="flex gap-6 items-center">
        {/* Home */}
        <li>
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
        </li>
        {/* Cuisines with dropdown */}
        <li className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:text-yellow-400 transition"
          >
            Cuisines ▾
          </button>
          {open && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
              <li>
                <Link
                  href="/italianFood"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Italian Food
                </Link>
              </li>
              <li>
                <Link
                  href="/indianFood"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Indian Food
                </Link>
              </li>
              <li>
                <Link
                  href="/chineseFood"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Chinese Food
                </Link>
              </li>
              <li>
                <Link
                  href="/arabFood"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Arabic Food
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;