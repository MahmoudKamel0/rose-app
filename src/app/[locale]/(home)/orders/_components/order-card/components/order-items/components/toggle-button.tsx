"use client";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

// define ToggleButtonProps
interface ToggleButtonProps {
    expanded: boolean;
    onClick: () => void;
    className?: string;
}

export default function ToggleButton({ expanded, onClick, className }: ToggleButtonProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");
    return (
        // Button to toggle the expanded/collapsed state of a list
        <button
            onClick={onClick}
            className={`absolute bottom-5 left-[47%] z-20 flex w-20 flex-col items-center justify-center font-medium capitalize text-[#A6252A] ${className || ""}`}
        >
            {/* Display appropriate label based on expanded state */}
            <span>{expanded ? t("orderItems.toggleButton.showLess") : t("orderItems.toggleButton.showAll")}</span>
            {/* Chevron icon that rotates when expanded */}
            <ChevronDown size={24} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
    );
}
