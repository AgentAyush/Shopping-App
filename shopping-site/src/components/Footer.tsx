
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#002c60] text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
      
        <div>
          <h3 className="font-bold mb-4 text-2xl">Filters</h3>
          <ul className="space-y-2 font-extralight">
            <li>
              <Link href="#" className="hover:underline">
                All
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-bold mb-4 text-2xl">About Us</h3>
          <ul className="space-y-2 font-thin">
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>


        <div>
          <h3 className="font-bold mb-4 text-2xl">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" className=" max-h-6 max-w-6">
              <img src="/facebook.jpg" alt="" />
            </Link>
            <Link href="#" className="max-h-5.5 max-w-5.5">
              <img src="/twitter.png" alt="" />
            </Link>
            <Link href="#" className="max-h-6 max-w-6">
              <img src="/instagram.png" alt="" />
            </Link>
          </div>
        </div>
     
        <div className="mt-8  text-left text-sm text-gray-300">
          © 2024 American
        </div>
      </div>
    </footer>
  );
}
