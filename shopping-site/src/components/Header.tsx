"use client";
import { ShoppingCart, User, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearch } from "@/redux/productsSlice";
import { useState, useEffect } from "react";

export default function Header() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearch(searchTerm));
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  return (
    <header className="bg-blue-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <div className="text-2xl font-bold">Logo</div>

 
      <div className="flex items-center bg-white rounded-md px-2 py-1 w-full sm:w-1/2">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-1 outline-none text-black"
        />
      </div>

 
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
