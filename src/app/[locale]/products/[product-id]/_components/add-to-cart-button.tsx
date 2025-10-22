"use client";
import { Button } from "@components/ui/button";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAddCart } from "../_hooks/use-products";
import { CartRequest } from "../_types/product-id";
import { toast } from "sonner";
import { AuthError } from "@app/[locale]/(auth)/_components/auth-error";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

type CartType = {
    productId: string;
    numberProduct: number;
};

export default function CartBtn({ productId, numberProduct }: CartType) {
    // Translation
    const t = useTranslations("product-detailes");

    // Use state
    const [btnDisable, setBtnDisable] = useState<boolean>(false);

    // Hooks
    const { data: sessionData } = useSession();
    const { mutateAddCart, error, isPending } = useAddCart();

    // Functions
    const handleCart = async () => {
        const cart: CartRequest = { product: productId, quantity: 1 };

        // If logged in → send to backend
        if (sessionData) {
            await mutateAddCart(cart, {
                onSuccess: () => {
                    setBtnDisable(true);
                    toast.success("success", {
                        description: "The Product was added to the cart",
                        duration: 3000,
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
            toast.success("Added to cart", { duration: 2500 });
            setBtnDisable(true);
        }
    };

    // UseEffect
    //  Sync localStorage → backend when user logs in
    useEffect(() => {
        if (typeof window === "undefined" || !sessionData) return;

        const localCart = localStorage.getItem("cart");
        if (!localCart) return;

        const parsed = JSON.parse(localCart);
        if (!Array.isArray(parsed) || parsed.length === 0) return;

        async function setCart() {
            for (const item of parsed) {
                await mutateAddCart({ product: item.product, quantity: item.quantity || 1 });
            }
        }

        setCart().then(() => {
            localStorage.removeItem("cart");
        });
    }, [sessionData, mutateAddCart]);

    // Check if already in localStorage (disable button)
    useEffect(() => {
        if (typeof window === "undefined") return;
        const existing = localStorage.getItem("cart");
        if (!existing) return;

        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed) && parsed.some((item: CartRequest) => item.product === productId)) {
            setBtnDisable(true);
        }
    }, [productId]);

    return (
        <div className="flex-1">
            <Button size={"xl"} isLoading={isPending} type="button" onClick={handleCart} disabled={btnDisable || !numberProduct}>
                <ShoppingCart className="h-6 w-6 text-white dark:text-zinc-800" />
                {!btnDisable ? t("add-cart") : t("added")}
            </Button>
            {error && <AuthError error={error?.message} />}
        </div>
    );
}
