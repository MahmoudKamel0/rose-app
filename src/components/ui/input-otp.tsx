"use client";
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn.util";

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput> & { hasError?: boolean }
>(({ className, containerClassName, hasError, ...props }, ref) => (
    <OTPInput
        ref={ref}
        inputMode="numeric"
        pattern="[0-9]*"
        containerClassName={cn("flex items-center gap-2", containerClassName)}
        className={cn("disabled:cursor-not-allowed", className)}
        onBeforeInput={(e: any) => {
            const char = e.data;
            if (char && !/^[0-9]$/.test(char)) e.preventDefault();
        }}
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2.5", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { index: number; hasError?: boolean }
>(({ index, className, hasError, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={cn(
                "border-input rounded-10 relative flex h-11 w-11 items-center justify-center border text-sm transition-all",
                "dark:border-zinc-600 dark:bg-zinc-700",
                isActive && "border-maroon-600 dark:border-softpink-400",
                hasError && "border-red-500", // <-- highlight in red if OTP is wrong
                "disabled:border-transparent disabled:bg-zinc-100 disabled:text-zinc-400"
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
                </div>
            )}
        </div>
    );
});

InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <Minus />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
