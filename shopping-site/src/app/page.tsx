"use client";
import Header from "@/components/Header";
import SidebarFilters from "@/components/SidebarFilters";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {

  const products = useSelector((state: RootState) => state.products.filtered);
  const category = useSelector((state: RootState) => state.products.category);
  const minPrice = useSelector((state: RootState) => state.products.minPrice);
  const maxPrice = useSelector((state: RootState) => state.products.maxPrice);


  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="flex flex-col sm:flex-row sm:items-start gap-6 p-4">

        <SidebarFilters />

        <section className="flex-1">
          <h2 className="text-4xl font-bold text-[#002c60] mb-4">
            Product Listing
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No products found in this range.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
