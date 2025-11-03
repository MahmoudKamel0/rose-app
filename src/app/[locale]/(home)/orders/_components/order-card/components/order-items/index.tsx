"use client";
import { useState } from "react";

import OrderProductItem from "./components/order-product-item";
import ToggleButton from "./components/toggle-button";

const products = [
  {
    title: "Moko Chocolate Set | Esperance Rose",
    imageUrl: "/images/orderimg.png",
    rating: 5,
    ratingCount: 4,
    quantity: 2,
    price: "1800 EGP",
  },
  {
    title: "Luxury Coffee Set",
    imageUrl: "/images/orderimg.png ",
    rating: 4,
    ratingCount: 10,
    quantity: 1,
    price: "950 EGP",
  },
 {
    title: "Luxury Coffee Set",
    imageUrl: "/images/orderimg.png ",
    rating: 4,
    ratingCount: 10,
    quantity: 1,
    price: "950 EGP",
  },
   {
    title: "Luxury Coffee Set",
    imageUrl: "/images/orderimg.png ",
    rating: 4,
    ratingCount: 10,
    quantity: 1,
    price: "950 EGP",
  },
   {
    title: "Luxury Coffee Set",
    imageUrl: "/images/orderimg.png ",
    rating: 4,
    ratingCount: 10,
    quantity: 1,
    price: "950 EGP",
  },
];

export default function OrderItems() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <h6 className="font-semibold flex gap-2.5 items-center">Order Items:</h6>
      <div
        className={`relative bg-white p-4 grid grid-cols-2 gap-2.5 rounded-lg transition-all duration-500 ${
          expanded ? "h-auto mb-2" : "h-[250px] overflow-hidden"
        }`}
      >
        {/* Fade / blur overlay */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-50 to-transparent z-10 pointer-events-none backdrop-blur-[1px]"></div>
        )}

        {/* Toggle button */}
        <ToggleButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />

        {/* Items */}
        {products.map((product, index) => (
          <OrderProductItem
            key={index}
            title={product.title}
            imageUrl={product.imageUrl}
            rating={product.rating}
            ratingCount={product.ratingCount}
            quantity={product.quantity}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
}
