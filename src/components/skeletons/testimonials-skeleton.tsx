import { cn } from "@lib/utils/cn.utils";

export default function TestimonialsSkeleton() {
    return (
        <div className={cn("flex h-[35rem] flex-col items-center justify-center gap-11 bg-rose-50")}>
            {/* Testimonials cards skeleton */}
            <div className="flex justify-center gap-6">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="relative flex w-[22rem] flex-col items-center rounded-3xl bg-white ps-5 pe-5 pt-14 pb-5 text-center shadow-md"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-[120px] w-[120px] animate-pulse rounded-full border-4 border-white bg-gray-200" />
                        </div>

                        <div className="mt-14 h-5 w-32 animate-pulse rounded-md bg-gray-200" />
                        <div className="mt-4 flex gap-2">
                            {[...Array(5)].map((_, j) => (
                                <div key={j} className="h-3 w-3 animate-pulse rounded-full bg-gray-200" />
                            ))}
                        </div>
                        <div className="mt-4 h-16 w-52 animate-pulse rounded-md bg-gray-200" />
                        <div className="mt-3 h-4 w-24 animate-pulse rounded-md bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}
