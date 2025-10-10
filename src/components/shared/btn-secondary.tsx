"use client";

import React from "react";
import { cn } from "@lib/utils/cn.utils";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

type BtnSecondaryProps = {
  text: string;
  bgColor?: string;   
  textColor?: string; 
};

export default function BtnSecondary({ text }: BtnSecondaryProps) {
  return (
    <Button
      className={cn(
        "inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-transparent shadow-none"
      )}
    >
      <span className={cn("text-maroon-700 text-base leading-none dark:text-softpink-200")}>{text}</span>
      <ArrowRight className="w-4 h-4 inline-block align-middle dark:text-softpink-200" color="#741C21" />
    </Button>
  );
}


