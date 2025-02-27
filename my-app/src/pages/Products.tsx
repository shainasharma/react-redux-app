import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { RootState, AppDispatch } from "../store/store";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.data);
  const loading = useSelector((state: RootState) => state.products.loading);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(fetchProducts(pageSize));
  }, [dispatch, pageSize]);

  // Define columns and keys for Products Table
  const productColumns = ["ID", "Title", "Price", "Category", "Brand", "Stock", "Rating"];
  const productKeys = ["id", "title", "price", "category", "brand", "stock", "rating"];

  return (
    <div>
      <h2>Products List</h2>
      <Pagination onPageChange={setPageSize} />
      {loading ? <p>Loading...</p> : <DataTable data={products} columns={productColumns} keys={productKeys} />}
    </div>
  );
};

export default Products;
