"use client";
import Header from "@/components/Header";
import SidebarFilters from "@/components/SidebarFilters";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.filtered);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="flex flex-col sm:flex-row gap-6 p-4">
        <SidebarFilters />
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-4">Product Listing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
