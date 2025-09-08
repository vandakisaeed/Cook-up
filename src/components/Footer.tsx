"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 mt-10">
      {/* Bottom note */}
      <div className="text-center text-sm text-gray-500 mt-4 ">
        © {new Date().getFullYear()} Recipe Center. All rights reserved.
      </div>
    </footer>
  );
}