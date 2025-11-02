"use client";

import React from "react";
import { cn } from "@lib/utils/cn.util";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BtnSecondaryProps = {
  text: string;
  bgColor?: string;   
  textColor?: string; 
  href: string; 
};

export default function  BtnSecondary ({ text, href }: BtnSecondaryProps) {
  return (
    <Link href={href}>
    <Button
      className={cn(
        "inline-flex items-center justify-between gap-2 px-4 py-2.5 bg-transparent shadow-none group"
      )}
    >
      <span className={cn("text-maroon-700 group-hover:text-white text-base leading-none dark:text-softpink-200")}>{text}</span>
      <ArrowRight className="w-4 h-4 inline-block align-middle dark:text-softpink-200 !stroke-maroon-700 group-hover:!stroke-white" color="#741C21" />
    </Button>
    </Link>
  );
}


