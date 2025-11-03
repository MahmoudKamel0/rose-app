"use client";
import { ChevronDown } from "lucide-react";

interface ToggleButtonProps {
  expanded: boolean;
  onClick: () => void;
  className?: string;
}

export default function ToggleButton({ expanded, onClick, className }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute z-20 text-[#A6252A] font-medium capitalize w-20 flex flex-col items-center justify-center bottom-5 left-[47%] ${className || ""}`}
    >
      <span>{expanded ? "show less" : "show all"}</span>
      <ChevronDown
        size={24}
        className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
      />
    </button>
  );
}
