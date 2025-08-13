"use client";
import { ShoppingCart, User, Search, ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearch } from "@/redux/productsSlice";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const hideSearchBar = pathname.startsWith("/product/");
    const isCartPage = pathname === "/cart";

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(setSearch(searchTerm));
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, dispatch]);

    return (
        <header className="bg-[#0958a7] text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="text-3xl font-bold flex items-center gap-2">
                {isCartPage ? (
                    <Link href="/" className="flex items-center gap-2 text-lg">
                        <ArrowLeft size={20} /> Continue Shopping
                    </Link>
                ) : (
                    <Link href="/">Logo</Link>
                )}
            </div>

 
            {!isCartPage && !hideSearchBar ? (
    
                <div className="flex items-center bg-[#0958a7] border-1 rounded-lg px-2 py-1 w-full sm:w-1/2">
                    <Search className="text-amber-50" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-2 py-1 outline-none text-amber-50 bg-transparent"
                    />
                </div>
            ) : (

                <nav className="flex gap-6 text-lg font-medium">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/products" className="hover:underline">Products</Link>
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </nav>
            )}

   
            <div className="flex items-center gap-4">
                {isCartPage && (
                    <Link href="/checkout">
                        <button className="bg-[#002c60] px-4 py-2 rounded-lg font-semibold">
                            Checkout
                        </button>
                    </Link>
                )}
                <div className="relative cursor-pointer">
                    <Link href="/cart">
                        <button className="h-10 px-6 py-2 flex items-center justify-center bg-[#002c60] rounded-lg">
                            <ShoppingCart size={24} />
                            {isClient && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                            Cart
                        </button>
                    </Link>
                </div>
                <User size={24} />
            </div>
        </header>
    );
}
