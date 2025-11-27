import CartBtn from "@app/[locale]/(home)/products/[productId]/_components/add-to-cart-button";
import RateStars from "@components/shared/rate-stars";
import { CardFooter } from "@components/ui/card";
import { FooterProductItemProps } from "@lib/types/components/pages/products";

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
        <CardFooter id="footer-item-product" className="block h-20 p-0">
            {/* Product title */}
            <h3 className="text-maroon-700 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold" title={product.title}>
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
                <CartBtn productId={product._id} numberProduct={product.quantity} size="rounded-icon" isText={false} />
            </div>
        </CardFooter>
    );
}
