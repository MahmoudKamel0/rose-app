import { Button } from "@components/ui/button";
import ProductsTable from "../_components/products/all-products-table";
import { Plus } from "lucide-react";
import { SearchInput } from "@components/shared/search-input";
import { Suspense } from "react";
import { getAllProducts, searchParams } from "@lib/apis/products/get-all-products.api";



export default async function DashboardProductsPage({   searchParams,
}: {
  searchParams: searchParams;
}) {

  const data = await getAllProducts({ page: searchParams.page || "1" });    // const response = await getAllProducts({ page: 1, limit: 12 });

  return (
    <div>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">All Products</h1>
            <Button  className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add a new product
            </Button>
        </div>
        <SearchInput className="flex-auto" placeholder="Search..." />
        <Suspense>
<ProductsTable products={data.products} />        </Suspense>
      
    </div>
  )
}
