"use client";
import { useDispatch } from "react-redux";
import { filterByCategory } from "@/redux/productsSlice";

export default function SidebarFilters() {
  const dispatch = useDispatch();

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category));
  };

  return (
    <aside className="bg-blue-100 p-4 rounded-lg w-full sm:w-64">
      <h2 className="font-bold mb-2">Filters</h2>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-semibold">Category</h3>
        <div className="flex flex-col gap-1 mt-2">
          {["All", "Electronics", "Clothing", "Home"].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold">Price</h3>
        <input type="range" min="0" max="1000" className="w-full mt-2" />
      </div>
    </aside>
  );
}
