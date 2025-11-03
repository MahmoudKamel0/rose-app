import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

// OrderProductItemProps
interface OrderProductItemProps {
    title: string;
    imageUrl: string;
    rating: number;
    ratingCount: number;
    quantity: number;
    price: number;
}

export default function OrderProductItem({ title, imageUrl, rating, ratingCount, quantity, price }: OrderProductItemProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");

    return (
        // Main container for a single order product item
        <div className="flex h-36 gap-2.5 rounded-lg bg-zinc-50">
            {/* Product image container */}
            <div className="relative h-full w-[117px] overflow-hidden rounded-s-lg bg-red-50">
                <Image src={imageUrl} alt={title} fill className="object-cover" />
            </div>
            {/* Product details container */}
            <div className="h-full flex-1 rounded-s-3xl p-2.5">
                <div className="flex h-full flex-col justify-between px-2.5">
                    {/* Title and rating section */}
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-[#741C21]">{title}</h2>
                        <div className="flex items-center gap-1.5">
                            <Star className="fill-[#FFA508] stroke-[#FFA508]" width={16.67} height={15.89} />
                            <p className="capitalize">
                                {t("orderItems.orderProductItem.rating")}: <span className="font-medium">{rating}/5</span>
                            </p>
                            <p className="font-medium text-blue-600">
                                ({ratingCount} {t("orderItems.orderProductItem.ratings")})
                            </p>
                        </div>
                    </div>
                    {/* Quantity and price section */}
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-[#741C21]">(×{quantity})</span>
                        <h5 className="text-xl font-semibold">{price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
