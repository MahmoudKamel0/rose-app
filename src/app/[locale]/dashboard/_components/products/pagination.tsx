"use client";

import { useState, useEffect } from "react";
import Pagination from "@components/features/application/pagination";
import { Product } from "@lib/types/end-point-api/products";
import { getAllProducts } from "@lib/apis/products/get-all-products.api";
import ProductsTable from "./all-products-table";

export default function ProductsTableWithPagination() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 12;

  useEffect(() => {
    async function fetchData() {
      const { products: fetchedProducts, metadata } = await getAllProducts({ page: currentPage, limit });
      setProducts(fetchedProducts);
      setTotalPages(metadata.totalPages);
    }
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <ProductsTable products={products} />
      <Pagination
        totalPages={totalPages}
        // currentPage={currentPage}
        // onPageChange={(page) => setCurrentPage(page)}
        className="mt-4"
      />
    </div>
  );
}
