import React from "react";
import Total from "./_components/total";
import AllCategory from "./_components/all-category";

export default function OverviewFirstRow() {
    return (
        <div className="flex gap-6">
            <Total />
            <AllCategory />
        </div>
    );
}
