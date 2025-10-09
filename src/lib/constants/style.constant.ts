import { cn } from "@lib/utils/cn.utils";

export const INPUT_STYLE = cn(
    // Light mode
    "w-input rounded-10 border-input focus-visible:!border-maroon-600 has-[input:invalid]:border-red-500 invalid:border-red-500 !flex items-center h-12 border bg-transparent px-3 py-1 text-base text-zinc-800 transition-colors placeholder:text-zinc-400 [&_svg]:stroke-zinc-400 hover:border-zinc-400 focus-visible:outline-none md:text-sm",
    "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-zinc-100",

    // Dark mode
    "dark:focus-visible:!border-softpink-400 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:has-[input:invalid]:border-red-500 dark:invalid:border-red-500 dark:placeholder:text-zinc-400 dark:hover:border-zinc-500",
    "dark:disabled:border-zinc-700 dark:disabled:[&_svg]:stroke-zinc-600 dark:disabled:bg-background dark:disabled:text-zinc-600 dark:disabled:placeholder:text-zinc-600"
)