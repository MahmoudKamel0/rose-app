import React from "react";
import CartItem from "./_components/cart-item";

export default function page() {
    return (
        <div className="flex h-[67rem] flex-col gap-5 overflow-y-auto rounded-md border border-zinc-200 p-5">
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
            <CartItem id={1} name="Product 1" price={10.99} image="/images/anniversary-gifts-roses.webp" rating={4.5} reviews={50} />
        </div>
    );
}
