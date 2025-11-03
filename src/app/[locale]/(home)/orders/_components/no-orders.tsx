import BtnPrimary from "@components/shared/btn-primary";
import { Link } from "@i18n/navigation";
import { PackageX } from "lucide-react";
import React from "react";

export default function NoOrders() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 py-24 shadow-sm dark:bg-zinc-900">
            <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
                <PackageX className="h-14 w-14 text-zinc-500 dark:text-zinc-400" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-zinc-700 dark:text-zinc-100">No Orders Yet</h2>
            <p className="mb-6 max-w-md text-center text-zinc-500 dark:text-zinc-400">
                You haven’t placed any orders yet. Once you make a purchase, your orders will appear here.
            </p>
            <Link href={"/products"}>
                <BtnPrimary text=" Start Shopping" />
            </Link>
        </div>
    );
}
