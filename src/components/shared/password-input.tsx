"use client";
import { EyeIcon, EyeOff } from "lucide-react";
import { Input } from "@components/ui/input";
import React, { useState } from "react";
import { cn } from "@lib/utils/cn.util";
import { INPUT_STYLE } from "@lib/constants/style.constant";

/**
 * PasswordInput
 *
 * A password input component with a show/hide visibility toggle.
 *
 * Features:
 * - Renders a password input field styled using the app's INPUT_STYLE.
 * - Includes an icon button to toggle password visibility between "password" and "text".
 * - The button displays an "eye" icon (show) or an "eye with slash" icon (hide), depending on state.
 * - Supports being disabled, which also disables the toggle button.
 * - Forwards ref for integration with forms/libraries.
 *
 * Props:
 * - Inherits all standard <input> props.
 * - `className?: string` — Optional extra classes for the outer div.
 * - `disabled?: boolean` — If true, input and toggle will be disabled.
 *
 * Usage example:
 * ```
 * <PasswordInput placeholder="Your password" />
 * ```
 */
const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, disabled, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <div className={cn(INPUT_STYLE, "ps-0", className)}>
            {/* Password input field */}
            <Input
                ref={ref}
                type={show ? "text" : "password"}
                disabled={disabled}
                className={cn("w-3/4 flex-auto border-0 !bg-transparent")}
                {...props}
            />

            {/* Toggle visibility button */}
            <button
                type="button"
                disabled={disabled}
                className={cn(disabled && "!cursor-not-allowed")}
                onClick={() => setShow(!show)}
                aria-label={show ? "Hide password" : "Show password"}
            >
                {show ? <EyeIcon className={cn("!stroke-zinc-800 dark:!stroke-zinc-50")} size="20" /> : <EyeOff size="20" />}
            </button>
        </div>
    );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
