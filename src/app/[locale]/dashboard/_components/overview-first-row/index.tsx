import React, { Suspense } from "react";
import Total from "./_components/total";
import AllCategory from "./_components/all-category";
import Loading from "@components/shared/loading";

export default function OverviewFirstRow() {
    return (
        <div className="flex gap-6">
            <Suspense fallback={<Loading />}>
                <Total />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <AllCategory />
            </Suspense>
        </div>
    );
}
