"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from '@components/ui/button';
import { useTranslations } from "next-intl";
import { cn } from "@lib/utils/cn.util";

type ResetButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function BtnReset({ onClick, label = "Reset", className }: ResetButtonProps) {
    const t = useTranslations("reset");
  
  return (
    <Button
      onClick={onClick}
      className={cn("flex items-center gap-1 text-red-600 hover:text-red-700 bg-transparent hover:bg-transparent transition text-sm font-normal !w-fit",className)}
    >
      <X size={16} className="inline-block align-middle !stroke-current" />
      <span>{t("label")}</span>
    </Button>
  );
}
