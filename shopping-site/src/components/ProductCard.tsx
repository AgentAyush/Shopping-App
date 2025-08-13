"use client";
import { addToCart } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-contain rounded bg-white"

        />
        <h3 className="mt-2 font-semibold text-black">{product.title}</h3>
        <p className="text-black">${product.price}</p>
      </Link>
      <button
        onClick={() =>
          dispatch(addToCart({ ...product, id: String(product.id), quantity: 1 }))
        }
        className="bg-[#0958a7] text-white px-4 py-2 mt-2 rounded hover:bg-[#002c60] w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
