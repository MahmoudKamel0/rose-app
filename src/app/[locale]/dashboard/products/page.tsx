import { Button } from "@components/ui/button";
import ProductsTable from "../_components/products/all-products-table";
import { Plus } from "lucide-react";
import Pagination from "@components/features/application/pagination";
import { getAllProducts, searchParams } from "@lib/apis/products/get-all-products.api";
import SearchProductsInput from "../_components/products/search-products-input";

export default async function DashboardProductsPage({ searchParams }: { searchParams: searchParams }) {

  // Extract current page number from URL query params (default = 1)
  const currentPage = searchParams.page || "1";

  // Extract search keyword from URL query params (default = empty)
  const keyword = searchParams.keyword || "";

  // Fetch products from server using pagination + keyword search
  const data = await getAllProducts({ 
    page: currentPage,
    keyword: keyword
  });

  return (
    <div className="gap-6 bg-zinc-50 pb-10">
      <div className="flex flex-col bg-white rounded-2xl py-9 px-6">

      {/* Page Header + CTA Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <Button className="flex items-center gap-2 text-base font-medium">
          <Plus className="w-6 h-6"  size={32} /> Add a new product
        </Button>
      </div>

      {/* Search Input (client component) that updates URL query */}
      <SearchProductsInput defaultKeyword={keyword} />

      {/* Products Table */}
      <ProductsTable products={data.products} />

      </div>
      {/* Pagination Component */}
      <Pagination 
        className="mt-6"
        totalPages={data.metadata.totalPages}
      />
      
    </div>
  );
}
