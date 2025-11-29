import React, { Suspense } from "react";
import OrdersWrapper from "./_components/orders-wrapper";
import Loading from "@components/shared/loading";
import { useTranslations } from "next-intl";

export default function Page() {
    // translate orders page
    const t = useTranslations("orders");
    return (
        <main className="m-auto mx-20 mt-16">
            {/* orders page title */}
            <h1 className="mb-8 text-5xl font-bold text-zinc-800">{t("pageTitle")}</h1>
            {/* orders wrapper */}
            <Suspense
                fallback={
                    <div className="flex min-h-[300px] items-center justify-center py-24">
                        <Loading label="Loading orders..." />
                    </div>
                }
            >
                <OrdersWrapper />
            </Suspense>
        </main>
    );
}
