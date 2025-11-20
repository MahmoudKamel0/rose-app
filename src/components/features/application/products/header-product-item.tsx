import { Badge } from "@components/ui/badge";
import { CardHeader } from "@components/ui/card";

/**
 * HeaderProductItem component
 *
 * Renders the header section for a product card, displaying badges such as "New" for new products
 * and a badge for out-of-stock items.
 *
 * @param {Object} props
 * @param {boolean} props.isNewProduct - Indicates if the product is new.
 * @param {boolean} props.isOutOfStock - Indicates if the product is out of stock.
 *
 * @returns {JSX.Element} The rendered header for a product item
 */

export default function HeaderProductItem({ isNewProduct, isOutOfStock }: { isNewProduct: boolean; isOutOfStock: boolean }) {
    return (
        <CardHeader className="flex flex-row items-center gap-1.5 p-0 absolute top-2.5 right-2.5 z-10">
            {/* Check if the product is new in order to display the "New" badge */}
            {isNewProduct && (
                <Badge className="uppercase my-0" variant="new">
                    New
                </Badge>
            )}

            {/* Check if the product is out of stock in order to display the badge */}
            {isOutOfStock && <Badge className="uppercase w-fit">out of the stock</Badge>}
        </CardHeader>
    );
}
