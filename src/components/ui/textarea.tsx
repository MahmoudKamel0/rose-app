import * as React from "react";
import { INPUT_STYLE } from "@lib/constants/style.constant";
import { cn } from "@lib/utils/cn.util";

/**
 * Textarea component
 *
 * A styled textarea input that forwards refs and allows passing additional props.
 * Applies the INPUT_STYLE from style constants and merges any additional className.
 *
 * @param {Object} props - React props for textarea element.
 * @param {string} [props.className] - Additional class names to apply.
 * @param {boolean} [props.error] - Whether the field has an error.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ref forwarded to the underlying textarea element.
 *
 * @returns {JSX.Element} A textarea element with applied styles and props.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea"> & { error?: boolean }>(
    ({ className, error, ...props }, ref) => {
        return <textarea className={cn(INPUT_STYLE, className, "resize-none", error && "!border-red-600")} ref={ref} {...props} />;
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
