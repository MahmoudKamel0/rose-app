import { Product } from "@lib/types/dashboard/product-statistics";
import { cn } from "@lib/utils/cn.util";

interface LowStockProps {
    products: Product[];
}

export default function LowStock({ products }: LowStockProps) {
    return (
        <div className="top-selling flex h-441 w-[536px] flex-col gap-6 rounded-2xl bg-white p-6 text-zinc-800 ">
            {/* Component title */}
            <h2 className="title text-2xl font-semibold capitalize">low stock products</h2>

            {/* Scrollable list of low stock products */}
            <div className="list flex flex-col gap-2.5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#7b1e24] hover:scrollbar-thumb-[#5a1218]">
                {/* Show message if no products */}
                {products.length === 0 && <p>No low stock products</p>}

                {products.map((item) => (
                    <div key={item.id} className={cn("border-black/8 flex items-center justify-between border-b pb-2.5")}>
                        {/* Product title */}
                        <h3 className="">{item.title}</h3>

                        {/* Product quantity with dynamic color */}
                        <h3 className={cn("text-sm font-medium capitalize", (item.quantity ?? 0) < 5 ? "text-red-600" : "text-zinc-800")}>
                            {/* Show 0 if quantity is negative or undefined */}
                            {Math.max(item.quantity ?? 0, 0)} Products
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
