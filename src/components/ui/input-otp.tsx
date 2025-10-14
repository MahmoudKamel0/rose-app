"use client";
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn.utils";


const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
    ({ className, containerClassName, ...props }, ref) => (
        <OTPInput
            ref={ref}
            inputMode="numeric"
            pattern="[0-9]*"
            containerClassName={cn("flex items-center gap-2", containerClassName)}
            className={cn("disabled:cursor-not-allowed", className)}
            onBeforeInput={(e: any) => {
                const char = e.data;
                if (char && !/^[0-9]$/.test(char)) {
                    e.preventDefault();
                }
            }}
            {...props}
        />
    )
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2.5", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & { index: number }>(
    ({ index, className, ...props }, ref) => {
        const inputOTPContext = React.useContext(OTPInputContext);
        const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

        return (
            <div
                ref={ref}
                className={cn(
                    "border-input relative flex h-11 w-11 items-center justify-center border text-sm transition-all rounded-10",
                    "dark:bg-zinc-700 dark:border-zinc-600",
                    isActive && "border-maroon-600 dark:border-softpink-400",
                    "disabled:bg-zinc-100 disabled:border-transparent disabled:text-zinc-400 dark:disabled:bg-background dark:disabled:border-zinc-700 dark:disabled:text-zinc-700",
                    className
                )}
                {...props}
            >
                {char}
                {hasFakeCaret && (
                    <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center")}>
                        <div className={cn("animate-caret-blink bg-foreground h-4 w-px duration-1000")} />
                    </div>
                )}
            </div>
        );
    }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <Minus />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
