import BtnPrimary from "@components/shared/btn-primary";
import Subtitle from "@components/shared/subtitle";
import { cn } from "@lib/utils/cn.utils";
import React from "react";

export default function Leftside() {
    return (
        <div className={cn("space-y-4 md:w-1/4")}>
            {/* Subtitle */}
            <Subtitle text="Best Selling" />
            {/* Hading */}
            <h2 className={cn("text-maroon-700 dark:text-softpink-200 text-3xl font-bold")}>
                <span className={cn("text-softpink-500")}>Check Out</span> What <br />
                Everyone’s <span className={cn("text-softpink-500")}>Buying</span> Right Now
            </h2>
            {/* Description */}
            <p className={cn("text-base text-zinc-500 dark:text-zinc-400")}>
                Not sure what to choose?
                <br />
                Start with our best sellers, these are the gifts our customers keep coming back for. Whether you're celebrating a birthday,
                anniversary or wedding, our top picks are guaranteed to leave a lasting impression.
            </p>
            {/* Button */}
            <BtnPrimary text="Explore Gifts " /> 
        </div>
    );
}
