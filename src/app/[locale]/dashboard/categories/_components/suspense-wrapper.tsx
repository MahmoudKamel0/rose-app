import Loading from "@components/shared/loading";
import { Suspense } from "react";

export default function SuspenseWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Suspense
            fallback={
                <div className="flex h-[938px] items-center justify-center rounded-lg bg-white">
                    <Loading label="Loading categories..." />
                </div>
            }
        >
            {children}
        </Suspense>
    );
}
