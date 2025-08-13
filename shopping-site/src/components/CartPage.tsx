"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/cartSlice";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "./Footer";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 20) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
          <Header />

    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 bg-white p-4 rounded shadow-sm gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="truncate">
                    <h2 className="font-semibold text-base sm:text-lg truncate">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <div className="w-24 text-right font-semibold">
                  ${item.price * item.quantity}
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:underline text-sm sm:text-base"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border-t bg-white rounded shadow-sm">
            <div className="flex justify-between text-lg font-bold">
              <span>Grand Total:</span>
              <span>${grandTotal}</span>
            </div>
            <button
              onClick={() => {
                alert("Order placed successfully!");
                dispatch(clearCart());
              }}
              className="mt-4 w-full bg-[#0958a7] text-white py-2 rounded hover:bg-[#06427d] transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
    <Footer />
    </div>

  );
}
