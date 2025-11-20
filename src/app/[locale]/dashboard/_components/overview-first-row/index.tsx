import AllCategory from "./_components/all-category";
import OverallStatistics from "./_components/overall-statistics";
import StatisictsSkeleton from "@components/skeletons/statisicts/statisicts.skeleton";
import { Suspense } from "react";

export default function OverviewFirstRow() {
    return (
        <div className="flex gap-6">
            <Suspense fallback={<StatisictsSkeleton />}>
                <OverallStatistics />
            </Suspense>
            <Suspense fallback={<StatisictsSkeleton />}>
                <AllCategory />
            </Suspense>
        </div>
    );
}
