import React from "react";
import CartHeader from "./_components/cart-header";
import { fetchCartData } from "@lib/apis/cart/get-logged-cart.api";
import CartItemCard from "./_components/cart-item";
import { CartErrorResponse, CartItem, CartSuccessResponse } from "@lib/types/components/cart";
import ClearCartButton from "./_components/clear-cart-button";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "@i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Page() {
    // get locale
    const locale = await getLocale();
    const isArabic = locale === "ar";

    // translations
    const t = await getTranslations("cart");

    // fetch cart
    const res = await fetchCartData();

    if (!res.ok) {
        const errorData = res.payload as CartErrorResponse;
        return (
            <div className="mt-10 text-center text-red-600">
                <h2 className="mb-3 text-2xl font-semibold">{t("failed")}</h2>
                <p>{errorData.error || errorData.message || t("something-wrong")}</p>
            </div>
        );
    }

    // get cart items
    const data = res.payload as CartSuccessResponse;

    // cart items
    const items: CartItem[] = data.cart.cartItems;

    return (
        <div className="w-full max-w-[50rem] flex-1">
            {/* cart header */}
            <div className="mb-6 flex items-center justify-between">
                <CartHeader count={items.length} />

                {/* clear cart button */}
                <ClearCartButton />
            </div>

            {/* cart items */}
            <div className="flex max-h-[67rem] flex-col gap-5 overflow-y-auto rounded-md border border-zinc-200 p-5">
                {items.length > 0 ? (
                    items.map((item: CartItem) => (
                        <CartItemCard
                            key={item._id}
                            id={item.product.id}
                            name={item.product.title}
                            price={item.product.priceAfterDiscount ?? item.product.price}
                            image={item.product.imgCover}
                            rating={item.product.rateAvg}
                            reviews={item.product.rateCount}
                            quantity={item.quantity}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/images/no-cart.png" alt="Empty Cart" width={250} height={214} className="mx-auto" />
                        <p className="text-lg text-zinc-400">{t("empty")}</p>
                    </div>
                )}
            </div>

            {/* continue shopping button */}
            <Button variant="default" className="mt-5 text-white">
                <Link href="/products" className="flex items-center gap-2">
                    <MoveLeft className={isArabic ? "rotate-180" : ""} />
                    {t("continue")}
                </Link>
            </Button>
        </div>
    );
}
