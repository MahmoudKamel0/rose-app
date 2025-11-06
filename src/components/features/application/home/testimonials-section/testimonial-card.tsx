"use client";

import { Testimonial } from "@lib/types/end-point-api/testimonial";
import { Star } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { cn } from "@lib/utils/cn.util";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    //  Translations
    const t = useTranslations();
    const formatter = useFormatter();

    return (
        <div
            className={cn(
                "relative flex w-[22rem] flex-col items-center rounded-3xl bg-white pb-5 pe-5 ps-5 pt-14 text-center shadow-md transition-all duration-300 hover:shadow-lg"
            )}
        >
            {/* Avatar */}
            <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
                <Image
                    width={120}
                    height={120}
                    src={testimonial.user.photo}
                    alt={t("testimonials-name", {
                        firstName: testimonial.user.firstName,
                        lastName: testimonial.user.lastName,
                    })}
                    className={cn("rounded-full border-4 border-white object-cover shadow-md")}
                />
            </div>

            {/* Name */}
            <h3 className={cn("font-semibold text-zinc-800")}>
                {t("testimonials-name", {
                    firstName: testimonial.user.firstName,
                    lastName: testimonial.user.lastName,
                })}
            </h3>

            {/* Stars */}
            <div className={cn("mb-2 mt-8 flex items-center justify-center gap-1.5")}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                        key={`star-${testimonial._id}-${i}`}
                        className={cn("h-[0.9rem] w-[0.9rem] transition-transform duration-200 hover:scale-110")}
                        stroke="#FBA707"
                        fill="#FBA707"
                    />
                ))}
            </div>

            {/* Content */}
            <p className={cn("mb-9 px-3 text-base font-medium text-zinc-800")}>{t("testimonials-content")}</p>

            {/* Date */}
            <span className={cn("text-xs text-gray-400")}>
                {t("testimonials-date", {
                    date: formatter.dateTime(new Date(testimonial.createdAt), "short"),
                })}
            </span>
        </div>
    );
}
