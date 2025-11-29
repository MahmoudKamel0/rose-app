"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn.util";
import { INPUT_STYLE } from "@lib/constants/style.constant";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, onChange, ...props }, ref) => {
    // State
    const [showPassword, setShowPassword] = React.useState(false);
    const [hasFiles, setHasFiles] = React.useState(false);

    // Variables
    const isPassword = type === "password";
    const isFile = type === "file";
    const id = React.useId();

    return (
        <div className="relative">
            <>
                <input
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    onChange={(e) => {
                        if (isFile) {
                            const files = (e.target as HTMLInputElement).files;
                            setHasFiles(!!files && files.length > 0);
                        }
                        if (onChange) onChange(e as React.ChangeEvent<HTMLInputElement>);
                    }}
                    id={id}
                    className={cn(
                        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-400",
                        isFile && "file:pointer-events-none file:cursor-pointer",
                        // hide native file text when no files are selected
                        isFile && !hasFiles && "text-transparent",
                        INPUT_STYLE,
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {/* scoped CSS to hide native file text when no files selected (targets chromium and some browsers) */}
                {!hasFiles && isFile && (
                    <style>{`
                    #${id}::-webkit-file-upload-text { color: transparent !important; }
                    #${id}::file-selector-button { color: inherit; }
                    #${id}::-ms-value { color: transparent !important; }
                `}</style>
                )}
            </>

            {/* Check here if the type i password add the eye icon */}
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none ltr:right-2 rtl:left-2"
                        // locale === "ar" ? "left-3" : "right-3" //  flip side dynamically
                    )}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                >
                    {showPassword ? (
                        // Eye Open
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    ) : (
                        // Eye Closed
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.284-3.419M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.198 5.032M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
