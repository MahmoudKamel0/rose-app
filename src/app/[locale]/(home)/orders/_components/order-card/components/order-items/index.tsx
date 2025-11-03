"use client";
import { useState } from "react";

import OrderProductItem from "./components/order-product-item";
import ToggleButton from "./components/toggle-button";
import { OrderItem } from "@lib/types/end-point-api/orders";

interface OrderItemsProps {
    orderItems: OrderItem[];
}

export default function OrderItems({ orderItems }: OrderItemsProps) {
    const [expanded, setExpanded] = useState(false);

    const hasMoreThanTwo = orderItems.length > 2;

    return (
        <>
            <h6 className="flex items-center gap-2.5 font-semibold">Order Items:</h6>
            <div
                className={`relative grid grid-cols-2 gap-2.5 rounded-lg bg-white p-4 transition-all duration-500 ${
                    expanded ? "mb-2 h-auto" : "h-[250px] overflow-hidden"
                }`}
            >
                {/* Fade / blur overlay */}
                {hasMoreThanTwo && !expanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-zinc-50 to-transparent backdrop-blur-[1px]"></div>
                )}

                {/* Toggle button */}
                {hasMoreThanTwo && <ToggleButton expanded={expanded} onClick={() => setExpanded(!expanded)} />}

                {/* Items */}
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
