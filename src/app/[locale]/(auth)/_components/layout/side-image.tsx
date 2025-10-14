import Image from "next/image";
import React from "react";

export default function SideImage() {
    return (
        <Image
            src="/images/auth-images/19fa7ca3acaafd1d3dac69a85dc6c3ff6b6d47cc.png"
            alt="Side Image"
            fill
            className="!relative w-full object-cover"
            priority
        />
    );
}
