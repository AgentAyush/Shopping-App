"use client";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPriceRange } from "@/redux/productsSlice";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { Range } from "react-range";

export default function SidebarFilters() {
  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector((state: RootState) => state.products);

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);


  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setPriceRange({ min: localMin, max: localMax }));
    }, 300);
    return () => clearTimeout(timer);
  }, [localMin, localMax, dispatch]);

  return (
    <aside className="bg-[#0958a7] p-4 rounded-lg w-full sm:w-64 inline-block">
      <h2 className="font-bold mb-2 text-white">Filters</h2>

<div className="mb-6">
  <h3 className="font-semibold text-white">Category</h3>
  <div className="flex flex-col gap-2 mt-2 text-white">
    {["All", "Electronics", "Clothing", "Home"].map((cat) => (
      <label
        key={cat}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name="category"
          onChange={() => dispatch(setCategory(cat))}
          className="appearance-none w-4 h-4 border-1 border-white rounded-full checked:border-3"
        />
        <span>{cat}</span>
      </label>
    ))}
  </div>
</div>


      <div>
        <h3 className="text-lg font-semibold mb-2">Price</h3>
      <Range
        step={10}
        min={0}
        max={1000}
        values={[minPrice, maxPrice]}
        onChange={(values) => {
          dispatch(setPriceRange({ min: values[0], max: values[1] }));
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-1 bg-gray-300 rounded"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
  const { key, ...rest } = props; 
  return (
    <div
      key={key} 
      {...rest}
      className="w-4 h-4 bg-white border border-[#80a9d3] rounded-full cursor-pointer"
    />
  );
}}

      />
      <div className="flex justify-between mt-2 text-sm">
        <span>{minPrice}</span>
        <span>{maxPrice}</span>
      </div>
      </div>
    </aside>
  );
}
