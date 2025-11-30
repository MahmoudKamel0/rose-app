"use client";

import { useAddCart } from "@/hooks/products/use-products.hook";
import { CartRequest } from "@/app/[locale]/(home)/products/[productId]/_types/product-id";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
    const { data: sessionData } = useSession();
    const { mutateAddCart } = useAddCart();

    useEffect(() => {
        // Only run when user logs in and we're in browser
        if (typeof window === "undefined" || !sessionData) return;

        // Get cart from localStorage
        const localCart = localStorage.getItem("cart");
        if (!localCart) return;

        // Parse and validate cart data
        let cartItems: CartRequest[];
        try {
            cartItems = JSON.parse(localCart);
            if (!Array.isArray(cartItems) || cartItems.length === 0) return;
        } catch {
            return;
        }

        // Sync cart with backend
        Promise.all(
            cartItems.map((item) =>
                mutateAddCart({
                    product: item.product,
                    quantity: item.quantity || 1,
                })
            )
        )
            .then(() => {
                // On success, clear localStorage and notify
                localStorage.removeItem("cart");
                toast.success("Cart synced successfully");
            })
            .catch(() => {
                toast.error("Failed to sync some items");
            });
    }, [sessionData, mutateAddCart]);

    return <>{children}</>;
}
