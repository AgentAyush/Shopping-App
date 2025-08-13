"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";
import Header from "@/components/Header";
import { Star } from "lucide-react";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-4">Product not found</div>;


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <Star key={i} fill="#002c60" stroke="#002c60" />;
      } else if (rating >= starValue - 0.5) {
        return (
          <Star
            key={i}
            fill="url(#halfGradient)"
            stroke="#002c60"
            className="text-[#002c60]"
          />
        );
      } else {
        return <Star key={i} stroke="#002c60" />;
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex md:gap-8 p-6">

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full h-[400px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex gap-2 mt-4">
              {[product.image, product.image, product.image].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-16 h-16 object-contain border rounded-lg p-1 cursor-pointer hover:border-blue-500"
                />
              ))}
            </div>
          </div>

   
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

             
              <div className="flex items-center gap-4 mt-2">
                <p className="text-2xl font-semibold text-gray-900">
                  ${product.price}
                </p>
              </div>
                <div className="flex items-center text-[#002c60]">
                  
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="halfGradient">
                        <stop offset="50%" stopColor="#002c60" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {renderStars(product.rating)}
                </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
              <p className="mt-3 text-sm text-gray-500">
                Category: <span className="capitalize">{product.category}</span>
              </p>

              
              <div className="mt-6 flex items-center gap-3 text-gray-700">
                <label className="font-medium">Quantity:</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.min(20, Math.max(1, Number(e.target.value))))
                  }
                  min={1}
                  max={20}
                  className="border border-gray-400 rounded-lg w-20 text-center py-1 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>

              
              <button
                onClick={() => dispatch(addToCart({ ...product, id: String(product.id), quantity: qty }))}
                className="w-full md:w-auto bg-[#0958a7] text-white px-8 py-3 mt-6 rounded-lg shadow-md hover:bg-[#002c60] transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>

            
            <div className="mt-10 border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
              <p className="text-gray-500 text-sm mt-2">
                No reviews yet. Be the first to review!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
