import { Plus } from "lucide-react";
import Link from "next/link";

export default function CategoryHeader() {
    return (
        <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-2xl font-semibold text-zinc-800">All Categories</h2>
            <Link
                href="/dashboard/categories/new-category"
                className="flex min-h-11 min-w-52 items-center justify-center gap-2.5 rounded-lg bg-maroon-600 p-2.5 font-medium text-white hover:opacity-90"
            >
                <Plus width={22} height={22} /> Add a new category
            </Link>
        </div>
    );
}
