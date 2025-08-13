"use client";
import { ShoppingCart, User, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Header() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="bg-blue-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <div className="text-2xl font-bold">Logo</div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-md px-2 py-1 w-full sm:w-1/2">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-2 py-1 outline-none text-black"
        />
      </div>

      {/* Cart + Profile */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        <User size={24} />
      </div>
    </header>
  );
}
