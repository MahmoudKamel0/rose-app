import BtnPrimary from "@components/shared/btn-primary";
import { Link } from "@i18n/navigation";
import { AlertTriangle } from "lucide-react";
import React from "react";

export default function OrdersError() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 py-24 shadow-sm dark:bg-zinc-900">
      <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
        <AlertTriangle className="h-14 w-14 text-red-500 dark:text-red-400" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Failed to Load Orders
      </h2>
      <p className="mb-6 max-w-md text-center text-zinc-500 dark:text-zinc-400">
        We couldn’t fetch your orders at this time. Please check your connection or try again later.
      </p>
      <Link href={"/products"}>
        <BtnPrimary text="Go Shopping" />
      </Link>
    </div>
  );
}
