"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      {/* <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <ul className="flex gap-6 mt-4 md:mt-0">
          <li>
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-yellow-400 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div> */}

      {/* Bottom note */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Recipe Center. All rights reserved.
      </div>
    </footer>
  );
}