"use client";
import { useState } from "react";

import OrderProductItem from "./order-product-item";
import ToggleButton from "./toggle-button";
import { OrderItem } from "@lib/types/end-point-api/orders";
import { useTranslations } from "next-intl";

interface OrderItemsProps {
    orderItems: OrderItem[]; // Array of order items to display
}

export default function OrderItems({ orderItems }: OrderItemsProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");

    // State to track whether the items list is expanded or collapsed
    const [expanded, setExpanded] = useState(false);

    // Check if there are more than zero items
    const hasMoreThanTwo = orderItems.length > 0;

    return (
        <>
            {/* Section label for order items */}
            <h6 className="flex items-center gap-2.5 font-semibold"> {t("orderItems.label")}</h6>
            {/* Container for order items */}
            <div
                className={`relative grid min-h-[250px] grid-cols-2 gap-2.5 rounded-lg bg-white p-4 transition-all duration-500 ${
                    expanded ? "mb-2 h-auto" : "overflow-hidden"
                }`}
            >
                {/* Fade / blur overlay */}
                {hasMoreThanTwo && !expanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-zinc-50 to-transparent backdrop-blur-[1px]"></div>
                )}

                {/* Toggle button */}
                {hasMoreThanTwo && <ToggleButton expanded={expanded} onClick={() => setExpanded(!expanded)} />}

                {/* Render each order item */}
                {orderItems.map((orderItem) => (
                    <OrderProductItem
                        key={orderItem._id}
                        title={orderItem.product.title}
                        imageUrl={orderItem.product.imgCover}
                        rating={orderItem.product.rateAvg}
                        ratingCount={orderItem.product.rateCount}
                        quantity={orderItem.quantity}
                        price={orderItem.price}
                    />
                ))}
            </div>
        </>
    );
}
