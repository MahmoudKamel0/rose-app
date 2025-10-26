import RateStars from "@components/shared/rate-stars";
import { Button } from "@components/ui/button";
import { CardFooter } from "@components/ui/card";
import { FooterProductItemProps } from "@lib/types/components/products";
import { ShoppingCart } from "lucide-react";


/**
 * FooterProductItem component
 *
 * Renders the footer section for a product card, displaying:
 * - The product name
 * - The current and old price with visual indication for discounts
 * - An add-to-cart button
 *
 * Can be reused inside product listing or item components.
 *
 * @returns {JSX.Element} The rendered footer for a product item
 */

export default function FooterProductItem({ product }: FooterProductItemProps) {
    const CURRENT_PRICE = product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price;
    const OLD_PRICE = product.priceAfterDiscount > 0;

    return (
        <CardFooter id="footer-item-product" className="h-20 block p-0">
            {/* Product title */}
            <h3 className="text-maroon-700 overflow-hidden text-lg font-semibold text-nowrap text-ellipsis" title={product.title}>
                {product.title}
            </h3>

            <div className="flex items-end justify-between">
                <div>
                    {/* Show RateStars */}
                    <RateStars rateCount={product.rateAvg} />

                    {/* Show current price and old price */}
                    <span className="text-maroon-700 font-medium" aria-label="current price">
                        {CURRENT_PRICE} EGP
                        {OLD_PRICE && (
                            <del className="ms-2 text-zinc-500" aria-label="price before discount">
                                {product.price} EGP
                            </del>
                        )}
                    </span>
                </div>

                {/* Add-to-cart button */}
                <Button className="!h-10 !w-10 place-items-center rounded-full">
                    <ShoppingCart className="!stroke-white" size="24" />
                </Button>
            </div>
        </CardFooter>
    );
}
