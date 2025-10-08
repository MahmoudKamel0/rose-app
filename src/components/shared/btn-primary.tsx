"use client";

import React from "react";
import { cn } from "@lib/utils/cn.utils";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

type BtnPrimaryProps = {
  text: string;
  bgColor?: string;   
  textColor?: string; 
};

export default function BtnPrimary({ text }: BtnPrimaryProps) {
  return (
    <Button
        // style={{
        //     "--btn-bg": bgColor,      
        //     "--btn-text": textColor,   
        // } as React.CSSProperties
        //     } 
      className={cn(
        "inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-maroon-600"
        // bgColor,
        // textColor
      )}
    >
      <span className={cn("text-white text-base leading-none")}>{text}</span>
      <ArrowRight className="w-4 h-4 inline-block align-middle" color="#ffffff" />
    </Button>
  );
}


