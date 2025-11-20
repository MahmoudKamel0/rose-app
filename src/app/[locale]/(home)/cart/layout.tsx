import CartHeader from "./_components/cart-header";
import { Button } from "@components/ui/button";
import { BrushCleaning } from "lucide-react";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="container mx-auto flex max-w-[80rem] gap-10">
            {/* cart */}
            <div className="w-[49rem]">
                {/* cart header */}
                <div className="mb-6 flex items-center justify-between">
                    {/* cart title */}
                    <CartHeader />

                    {/* Clear Cart button */}
                    <Button variant="secondary" className="!flex w-[11rem] items-center justify-center gap-2 text-sm font-semibold">
                        <BrushCleaning size={20} />
                        Clear Cart
                    </Button>
                </div>

                {children}
            </div>

            {/* cart summary */}
            <div></div>
        </section>
    );
}
