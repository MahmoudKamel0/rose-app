"use client";

import Image from "next/image";
import { Button } from "@components/ui/button";
import { OccasionCardProps } from "@lib/types/occasions";
import { cn } from "@lib/utils/cn.util";

export default function OccasionCard({ id, name, image, selected, onToggle }: OccasionCardProps) {

  return (
    <Button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-label={name}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle();
        }
      }}
  className={cn(
    "relative w-34 h-18 rounded-xl overflow-hidden text-white font-medium focus:outline-none transition-all duration-150 group",
    selected
      ? "ring-4 ring-primary ring-offset-2 ring-offset-background"
      : "ring-0"
  )}
>
  {/* Occasion background image */}
  <div className="absolute inset-0">
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_API}/uploads/${image}`}
      alt={name}
      fill
      className="object-cover"
    />
  </div>

  {/* Gradient top layer */}
  <div
    className={cn(
      "absolute inset-0 transition-all duration-200",
      selected
        ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.1375)_0%,rgba(166,37,42,0.55)_100%)]"
        : "bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.8)_100%)]",
      "group-hover:bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.5)_100%)]"
    )}
    aria-hidden
  />

  {/* Occasion Name */}
  <span className="absolute inset-0 z-10 flex items-center justify-center text-base font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {name}
  </span>

    </Button>
  );
}
