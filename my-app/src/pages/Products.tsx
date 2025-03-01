import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import DataTable from "../components/Table";
import Filters from "../components/Filters";
import { RootState, AppDispatch } from "../redux/store";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.data || []);
  const loading = useSelector((state: RootState) => state.products.loading);
  const totalProducts = useSelector((state: RootState) => state.products.total || 0);

  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<{ key: string; value: string }>({ key: "", value: "" });

  useEffect(() => {
      dispatch(fetchProducts({ limit: pageSize, skip, filterKey: filters.key, filterValue: filters.value }));
    }, [dispatch, pageSize, skip, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ key, value });
    setSkip(0);
  };

  const filterOptions = [
    { key: "title", label: "Title", type: "text" as const },
    { key: "brand", label: "Brand", type: "text" as const },
    { key: "category", label: "Category", type: "text" as const },
  ];

  return (
    <div className="max-w-6xl mx-auto px-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold p-4">Products</h2>
      
      {/* Filters */}
      <Filters filters={filters} setFilters={handleFilterChange} filterOptions={filterOptions} />

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <DataTable
          data={products}
          columns={["Title", "Brand", "Category", "Price","Rating", "Stock", "Discount Percentage"]}
          keys={["title", "brand", "category", "price", "rating", "stock", "discountPercentage"]}
          pageSize={pageSize}
          setPageSize={setPageSize}
          skip={skip}
          setSkip={setSkip}
          totalItems={totalProducts}
        />
      )}
    </div>
  );
};

export default Products;
