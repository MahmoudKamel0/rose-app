import { cn } from "@lib/utils/cn.utils";
import Image from "next/image";
import React from "react";

interface DecorationImageProps {
    rotated?: boolean;
    margin?: string;
}

export default function DecorationImage({ rotated = false, margin }: DecorationImageProps) {
    return (
        <Image
            src="/images/auth-images/848dc8a0225f8d25495d83e5c7f2ab598dd3f997.png"
            alt="Decoration Image"
            width={280}
            height={45}
            priority
            className={cn("object-cover", { "rotate-180": rotated }, margin)}
        />
    );
}
