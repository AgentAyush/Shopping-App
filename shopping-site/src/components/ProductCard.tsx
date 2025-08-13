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
          className="h-40 w-full object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
      <button
        onClick={() =>
          dispatch(addToCart({ ...product, quantity: 1 }))
        }
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
