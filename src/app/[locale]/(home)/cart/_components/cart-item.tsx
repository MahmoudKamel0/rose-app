"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef, ChangeEvent } from "react";
import { Input } from "@components/ui/input";
import { toast } from "sonner";
import { useRouter } from "@i18n/navigation";
import { useTranslations } from "next-intl";
import { updateCartItemAction } from "@lib/apis/cart/update-cart-item.api";
import { deleteCartItemAction } from "@lib/apis/cart/delete-cart-item.api";
import { CartErrorResponse, CartSuccessResponse } from "@lib/types/components/cart";

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    quantity: number;
}

export default function CartItemCard({ id, name, price, image, rating, reviews, quantity: initialQuantity }: CartItemProps) {
    // States
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // refresh cart
    const router = useRouter();

    // reference for debouncing
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // translations
    const t = useTranslations("cart");

    // Debounced update function
    const updateQuantity = (newQuantity: number) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            const res = await updateCartItemAction(id, newQuantity);

            if (!res.ok) {
                const msg = (res.payload as CartErrorResponse)?.message || t("failed-update");
                toast.error(msg);
                return;
            }

            toast.success((res.payload as CartSuccessResponse)?.message || t("quantity-updated"));
            router.refresh();
        }, 600);
    };

    // increase quantity
    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    };

    // decrease quantity
    const handleDecrease = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    };

    // change quantity
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const newQuantity = !isNaN(value) && value > 0 ? value : 1;
        setQuantity(newQuantity);
        updateQuantity(newQuantity);
    };

    // remove item
    const handleRemove = async () => {
        try {
            setIsLoading(true);
            const result = await deleteCartItemAction(id);

            if ("cart" in result) {
                toast.success(result.message || t("item-removed-success"));
                router.refresh();
            } else {
                toast.error(result.message || t("item-removed-failed"));
            }
        } catch {
            toast.error(t("something-wrong"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card
            className={`flex items-center gap-4 rounded-none border-0 border-b border-zinc-200 px-0 py-5 shadow-none ${
                isLoading ? "pointer-events-none opacity-50" : ""
            }`}
        >
            {/* Product Image */}
            <div className="relative me-4 h-[9rem] w-[7.3rem] flex-shrink-0 overflow-hidden rounded-md border-transparent">
                <Image src={image} alt={name} fill className="rounded-sm object-cover" />
            </div>

            <div className="flex flex-1 flex-col gap-12">
                {/* Product Info */}
                <CardContent className="flex justify-between p-0">
                    <div>
                        <h3 className="text-lg font-semibold text-maroon-700">{name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="h-5 w-5 fill-[#FFA508] text-[#FFA508]" />
                            <p className="font-primary text-base font-normal leading-[100%]">
                                {t("rating")}: <span className="font-primary text-base font-medium leading-[100%]">{rating}/5</span>
                            </p>

                            <Link href="#" className="font-primary ml-1 text-lg font-medium leading-[100%] text-blue-500 hover:underline">
                                ({reviews} {t("ratings")})
                            </Link>
                        </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                        variant="red"
                        size="icon"
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="!flex h-10 w-24 items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="ml-2">{t("removing")}</span>
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                <span className="ml-2">{t("remove")}</span>
                            </>
                        )}
                    </Button>
                </CardContent>

                {/* Quantity & Price */}
                <div className="flex justify-between">
                    <div className="flex items-center justify-center gap-1">
                        <div className="font-primary align-middle text-base font-medium leading-[100%] text-maroon-600">(x{quantity})</div>
                        <div className="font-primary mt-1 align-middle text-[24px] font-bold leading-[100%] text-gray-900">
                            {(price * quantity).toFixed(2)} <span className="text-[14px]">EGP</span>
                        </div>
                    </div>

                    {/* decrease Quantity Controls */}
                    <div className="mt-1 flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleDecrease}
                            disabled={isLoading || quantity === 1}
                            className="!flex h-12 w-12 items-center justify-center"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        {/* Quantity Input */}
                        <Input
                            type="number"
                            min="1"
                            max="10"
                            value={quantity}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="font-primary h-[49px] w-[6.5rem] rounded-[10px] border border-gray-300 p-4 text-center text-[16px] font-medium leading-[100%] focus:outline-none focus:ring-2 focus:ring-maroon-600"
                        />

                        {/* Increase Quantity Button */}
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleIncrease}
                            disabled={isLoading}
                            className="!flex h-12 w-12 items-center justify-center"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
