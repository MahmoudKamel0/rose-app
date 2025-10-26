import { cn } from '@lib/utils/cn.util'
import { CircleX } from 'lucide-react'
import React from 'react'

export default function SubmissionFeedback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {

    // Handle no children case - no empty feedback box
    if(!children) return null;

  return (
 <div
      {...props}
      className={cn(
        "relative mx-auto w-fit rounded-2xl border border-maroon-200/50 bg-maroon-50/60 px-5 pb-5 pt-3 text-center text-maroon-700 shadow-sm mb-5",
        "dark:border-softpink-200/40 dark:bg-softpink-200/10 dark:text-softpink-200",
        className
      )}
    >
        {/* Icon */}
      <CircleX
        size={22}
        strokeWidth={1.4}
        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 text-maroon-600 dark:text-softpink-300 rounded-full shadow-sm"
      />

      {/* Content */}
      <p className="text-sm font-medium tracking-wide mt-2">{children}</p>
    </div>
  );
}