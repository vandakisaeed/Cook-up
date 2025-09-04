import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Explore World Cuisines
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Italian */}
        <Link
          href="/italianFood"
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          <div className="h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-xl font-semibold group-hover:text-yellow-500 transition">
              Italian Food
            </span>
          </div>
        </Link>

        {/* Indian */}
        <Link
          href="/indianFood"
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          <div className="h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-xl font-semibold group-hover:text-yellow-500 transition">
              Indian Food
            </span>
          </div>
        </Link>

        {/* Chinese */}
        <Link
          href="/chineseFood"
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          <div className="h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-xl font-semibold group-hover:text-yellow-500 transition">
              Chinese Food
            </span>
          </div>
        </Link>

        {/* Arab */}
        <Link
          href="/arabFood"
          className="group relative rounded-xl overflow-hidden shadow-lg"
        >
          <div className="h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-xl font-semibold group-hover:text-yellow-500 transition">
              Arab Food
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}