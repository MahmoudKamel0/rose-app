import FooterProductItem from "./footer-product-item";
import HeaderProductItem from "./header-product-item";
import { Link } from "@/i18n/navigation";
import { Card } from "@components/ui/card";
import { ProductItemProps } from "@lib/types/components/pages/products";
import Image from "next/image";

/**
 * ProductItem component
 *
 * Represents a single product item in the product listing.
 * Displays product image in a clickable card and the product footer using FooterProductItem.
 *
 * @param {ProductItemProps} props - The properties object.
 * @param {string|number} [props.key] - Optional unique React key for efficient rendering.
 *
 * @returns {JSX.Element} The rendered ProductItem component.
 */

export default function ProductItem({ key, product }: ProductItemProps) {
    const createdYear = new Date(product.createdAt).getFullYear();
    const isNewProduct = new Date().getFullYear() /* Date today */ - createdYear <= 1;
    const isOutOfStock = product.quantity <= 0;

    return (
        <Card key={key} className="flex h-[346px] flex-auto flex-col gap-4 border-none shadow-none">
            <Link href="/products" className="relative h-[272px] w-full overflow-hidden rounded-xl">
                <HeaderProductItem isNewProduct={isNewProduct} isOutOfStock={isOutOfStock} />
                <Image className="object-cover" src={product.imgCover} alt={product.title} fill />
            </Link>

            <FooterProductItem product={product} />
        </Card>
    );
}
