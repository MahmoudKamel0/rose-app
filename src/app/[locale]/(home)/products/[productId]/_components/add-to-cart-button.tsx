"use client";
import { Button } from "@components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useAddCart, useGetUserCart } from "../_hooks/use-products.hook";
import { CartRequest } from "../_types/product-id";
import { toast } from "sonner";
import { AuthError } from "@app/[locale]/(auth)/_components/auth-error";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@i18n/navigation";

type CartType = {
    productId: string;
    numberProduct: number;
    size?: "xl" | "icon" | "link" | "default" | "sm" | "lg" | "rounded-icon";
    isText?: boolean;
    inStock?: boolean;
};

export default function CartBtn({ productId, numberProduct, size = "xl", isText = true }: CartType) {
    // Router
    const route = useRouter();

    // Translation
    const t = useTranslations("product-details");

    // Use state
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
    const [btnDisableLogged, setBtnDisableLogged] = useState<boolean>(false);
    const [isPendingCheck, setIsPendingCheck] = useState<boolean>(false);

    // Hooks
    const { data: sessionData } = useSession();

    // Update isPendingCheck based on session status

    const { mutateAddCart, error, isPending } = useAddCart();
    const { cartItem, error: checkError, isPending: checkIsPending } = useGetUserCart();

    // Functions
    const handleCart = async () => {
        const cart: CartRequest = { product: productId, quantity: 1 };

        // If logged in → send to backend
        if (sessionData) {
            await mutateAddCart(cart, {
                onSuccess: () => {
                    setBtnDisable(true);
                    setBtnDisableLogged(true); // Immediately update the button state
                    route.refresh();
                    toast.success(t("success"), {
                        description: t("toast-added"),
                        duration: 2000,
                    });
                },
            });
            return;
        }

        // If not logged in → store in localStorage
        if (typeof window !== "undefined") {
            const existing = localStorage.getItem("cart");
            let cartArray: CartRequest[] = [];

            if (existing) {
                const parsed = JSON.parse(existing);
                cartArray = Array.isArray(parsed) ? parsed : [parsed];
            }

            cartArray.push(cart);
            localStorage.setItem("cart", JSON.stringify(cartArray));
            toast.success(t("success"), {
                description: t("toast-added"),
                duration: 2000,
            });
            setBtnDisable(true);
            setBtnDisableLogged(true); // Set to show check mark icon
        }
    };

    // Sync is now handled by CartSyncProvider

    // Check if already in localStorage (disable button and show check mark)
    useEffect(() => {
        if (typeof window === "undefined") return;
        const existing = localStorage.getItem("cart");
        if (!existing) return;

        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed) && parsed.some((item: CartRequest) => item.product === productId)) {
            setBtnDisable(true);
            setBtnDisableLogged(true); // Set to show check mark icon for items in localStorage
        }
    }, [productId]);

    // Check if already in localStorage (disable button)

    useEffect(() => {
        // Set isPendingCheck based on session status
        setIsPendingCheck(sessionData ? !!checkIsPending : false);

        // Check cart items if we have session and cart data
        if (sessionData && cartItem && !checkIsPending && !checkError && cartItem?.cart.cartItems.length > 0) {
            const find = cartItem?.cart.cartItems.find((item) => item.product._id === productId);

            if (!!find) {
                setBtnDisableLogged(true);
            }
        }
    }, [productId, cartItem, sessionData, checkError, checkIsPending]);

    return (
        <>
            <Button
                size={size}
                isLoading={isPending || isPendingCheck}
                type="button"
                onClick={() => handleCart()}
                disabled={btnDisable || numberProduct < 1 || btnDisableLogged || isPendingCheck}
                className={`text-white dark:text-zinc-800 ${btnDisableLogged && "!bg-green-700 dark:!bg-zinc-50"}`}
            >
                <>
                    {btnDisableLogged ? (
                        <Check className="h-6 w-6 text-white dark:text-zinc-800" strokeWidth={2} />
                    ) : (
                        <ShoppingCart className="h-6 w-6 text-white dark:text-zinc-800" />
                    )}
                    {isText && <span> {numberProduct < 1 ? t("sold-out") : !btnDisable ? t("add-cart") : t("added")}</span>}
                </>
            </Button>
            {error && <AuthError error={error?.message} />}
        </>
    );
}
