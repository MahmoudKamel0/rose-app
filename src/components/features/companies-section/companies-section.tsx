
import Image from "next/image";
import React from "react";

const companyLogos = [
    {
        src: "/images/sponsors/coconut.webp",
        alt: "Coconut Cosmetics logo in soft gray text",
    },
    {
        src: "/images/sponsors/ginyard.webp",
        alt: "Ginyard logo with a leaf accent above the letter i",
    },
    {
        src: "/images/sponsors/ingoude2.webp",
        alt: "Ingoude Company logo with wavy underline design",
    },
    {
        src: "/images/sponsors/velvet.webp",
        alt: "Velvet Cosmetics logo in minimalist gray font",
    },
    {
        src: "/images/sponsors/ingoude.webp",
        alt: "Ingoude Company logo in elegant rounded typography",
    },
    {
        src: "/images/sponsors/habun.webp",
        alt: "Habur Furniture logo with clean modern lettering",
    },
];

export default function CompaniesSection() {
    return (
        //  Main container: Background color changes in dark mode
        <section className="mt-32 flex min-h-52 flex-col justify-center gap-10 rounded-2xl bg-[#FBEAEA] dark:bg-zinc-700">
            {/*  Section heading */}
            <h2 className="text-center text-4xl font-bold text-[#741C21] dark:text-[#FFC2D0]">
                Trusted by over <span className="text-[#FF668B] dark:text-[#D75458]">4.5k+</span> companies
            </h2>

            {/*  Company logos list */}
            {/* Dynamically render sponsor logos from the companyLogos array */}
            <div className="company-logos flex flex-wrap items-center justify-center gap-[71px]">
                {companyLogos.map((logo) => (
                    <Image key={logo.src} src={logo.src} alt={logo.alt} width={146} height={51} />
                ))}
            </div>
        </section>
    );
}
