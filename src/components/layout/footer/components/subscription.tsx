import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { ArrowRight } from "lucide-react";

/**
 * Subscription Component
 *
 * This component renders a newsletter subscription form for the footer section.
 * - Shows a promotional header highlighting a 20% discount for new subscribers.
 * - Includes a brief description inviting users to subscribe.
 * - Displays an input field for the user's email and a Subscribe button adorned with an arrow icon.
 *
 * Usage:
 * <Subscription />
 *
 * Note: Currently only renders UI and does not handle form submission logic.
 */

export default function Subscription() {
    return (
        <div className="w-96">
            {/* Header */}
            <h4 className="text-softpink-300 text-xl font-semibold">
                Get <span className="text-white">20%</span> Off Discount Coupon
            </h4>
            <p className="mb-5 text-zinc-500">By subscribing to our newsletter</p>

            {/* Form subscription email */}
            <form className="relative h-10 w-full overflow-hidden rounded-full">
                <Input
                    type="email"
                    className="h-full w-full border-0 bg-zinc-600 text-zinc-50 placeholder:text-zinc-400"
                    placeholder="Enter Your Email"
                />
                <Button className="bg-maroon-50 hover:bg-maroon-100 text-maroon-700 [&_svg]:stroke-maroon-700 absolute top-0 right-0 !flex h-full w-28 items-center rounded-full">
                    Subscribe <ArrowRight />
                </Button>
            </form>
        </div>
    );
}
