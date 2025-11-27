import { Button } from "@components/ui/button";
import ProductsTable from "../_components/products/all-products-table";
import { Plus } from "lucide-react";
import Pagination from "@components/features/application/pagination";
import { getAllProducts, searchParams } from "@lib/apis/products/get-all-products.api";
import SearchProductsInput from "../_components/products/search-products-input";

export default async function DashboardProductsPage({ searchParams }: { searchParams: searchParams }) {
  
  const currentPage = searchParams.page || "1";
  const keyword = searchParams.keyword || "";

  const data = await getAllProducts({ 
    page: currentPage,
    keyword: keyword
 });

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add a new product
        </Button>
      </div>

  <SearchProductsInput defaultKeyword={keyword} />

        <ProductsTable products={data.products} />

      {/* Added Pagination */}
      <Pagination 
        className="mt-6"
        totalPages={data.metadata.totalPages}
      />

    </div>
  );
}
