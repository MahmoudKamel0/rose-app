import React from "react";
import CategoriesFilters from "./_components/categories";
import RatingFilter from "./_components/rating-filtration";
import ResetAll from "./_components/common/reset-all";

export default function Products() {
    return (
        <div className="m-auto mx-20 mt-3 flex gap-6">
            <div className="filters flex w-[301px] flex-col gap-2.5">
                <CategoriesFilters />
                <RatingFilter />
                <ResetAll />
            </div>
            <div className="products-list flex-1 bg-emerald-400">2</div>
        </div>
    );
}
