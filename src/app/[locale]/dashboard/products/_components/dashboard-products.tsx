import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import Pagination from "@components/features/application/pagination";
import SearchProductsInput from "./search-products-input";
import ProductsTable from "./all-products-table";
import { ProductDashboardSteps, searchParams } from "@lib/types/product-dashboard";
import { useGetAllProducts } from "../../hooks/use-get-all-products.hook";
import { useEffect, useState } from "react";
import PageLoader from "@components/shared/page-loader";
import { ProductsApiResponse } from "@lib/types/products";

export default function DashboardProducts({
    searchParams,
    setStep,
    setProductId,
}: {
    searchParams: searchParams;
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
    setProductId: React.Dispatch<React.SetStateAction<string>>;
}) {
    // Extract current page number from URL query params (default = 1)
    const currentPage = searchParams.page || "1";

    // Extract search keyword from URL query params (default = empty)
    const keyword = searchParams.keyword || "";

    // Fetch products from server using pagination + keyword search
    const { mutateAsync, error, isPending } = useGetAllProducts();
    const [productData, setProductData] = useState<ProductsApiResponse | { error: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await mutateAsync({
                page: currentPage,
                keyword: keyword,
            });
            setProductData(res);
        };
        fetchData();
    }, [currentPage, keyword, mutateAsync]);

    return (
        <div className="gap-6 bg-zinc-50 pb-10">
            <div className="flex flex-col rounded-2xl bg-white px-6 py-9">
                {/* Page Header + CTA Button */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">All Products</h1>
                    <Button type="button" className="flex items-center gap-2 text-base font-medium" onClick={() => setStep("new_product")}>
                        <Plus className="h-6 w-6" size={32} /> Add a new product
                    </Button>
                </div>

                {/* Search Input (client component) that updates URL query */}
                <SearchProductsInput defaultKeyword={keyword} />

                {/* Handle Error */}
                {error && <p className="mt-6 text-red-500">Error: {error}</p>}

                {/* Products Table */}
                {!productData && isPending ? (
                    <PageLoader />
                ) : (
                    productData &&
                    !("error" in productData) && (
                        <ProductsTable products={productData.products} setProductId={setProductId} setStep={setStep} />
                    )
                )}
            </div>
            {/* Pagination Component */}
            <Pagination className="mt-6" totalPages={productData && !("error" in productData) ? productData?.metadata.totalPages : 1} />
        </div>
    );
}
