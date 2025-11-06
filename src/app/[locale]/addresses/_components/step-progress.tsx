"use client";

import { cn } from "@lib/utils/cn.util";

const steps = [
    { id: 0 },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3 }, // no label → no circle rendered
];

export function StepProgress({ currentStep }: { currentStep: number }) {
    return (
        <div className="relative flex w-full items-center">
            {/* Full background line */}
            <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-zinc-300 dark:bg-zinc-700" />

            {/* Active line up to current step */}
            <div
                className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-rose-700 transition-all duration-300"
                style={{
                    // ✅ fill up to current step (not before)
                    width: steps.length > 1 ? `${(currentStep / (steps.length - 1)) * 100}%` : "0%",
                }}
            />

            {/* Step circles */}
            {steps.map((step, index) => {
                if (!step.label) return null; // skip steps with no label

                const isActive = currentStep === step.id;
                const isCompleted = currentStep >= step.id; // ✅ active step counts as completed

                return (
                    <div
                        key={step.id}
                        style={{
                            left: `${(index / (steps.length - 1)) * 100}%`,
                            transform: "translateX(-50%)",
                        }}
                        className={cn(
                            "absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-200",
                            isCompleted
                                ? "border-rose-700 bg-rose-700 text-white"
                                : isActive
                                  ? "border-rose-700 bg-white text-rose-700 dark:bg-zinc-900"
                                  : "border-zinc-300 bg-white text-zinc-400 dark:bg-zinc-900"
                        )}
                    >
                        {step.label}
                    </div>
                );
            })}
        </div>
    );
}
