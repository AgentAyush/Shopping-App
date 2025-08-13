"use client";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPriceRange } from "@/redux/productSlice";

export default function SidebarFilters() {
  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector((state: RootState) => state.products.priceRange);

  return (
    <div className="bg-blue-900 text-white p-4 rounded-lg w-full sm:w-64">
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
            className="h-2 bg-gray-300 rounded"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-white border border-gray-400 rounded-full cursor-pointer"
          />
        )}
      />
      <div className="flex justify-between mt-2 text-sm">
        <span>{minPrice}</span>
        <span>{maxPrice}</span>
      </div>
    </div>
  );
}
