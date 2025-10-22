"use client";

import Image from "next/image";
import { cn } from "@lib/utils/cn.utils";

interface OccasionCardProps {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  onToggle: () => void;
}

export default function OccasionCard({ id, name, image, selected, onToggle }: OccasionCardProps) {
  // build src: accept absolute or filename
  const src = image?.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_BASE_API}/uploads/${image}`;

  return (
    <button
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
        "relative w-full h-18 rounded-xl overflow-hidden text-white font-medium focus:outline-none",
        "transition-all duration-150",
        selected ? "ring-4 ring-primary ring-offset-2 ring-offset-background" : "ring-0"
      )}
    >
      <div className="absolute inset-0">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.8)_100%)]" aria-hidden />
      <span className="absolute inset-0 z-10 flex items-center justify-center text-base font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {name}
      </span>
    </button>
  );
}
