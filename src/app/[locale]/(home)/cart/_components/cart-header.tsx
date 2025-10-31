import React from "react";

export default function CartHeader() {
    return (
        <div className="flex items-end gap-2">
            {/* cart title */}
            <h1 className="text-5xl font-bold">Cart</h1>
            {/* cart count */}
            <span className="h-4 text-base text-zinc-400">6 products</span>
        </div>
    );
}
