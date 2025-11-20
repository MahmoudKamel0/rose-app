"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@components/ui/input";
import { Minus, Plus, Trash2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
}

export default function CartItem({ id, name, price, image, rating, reviews }: CartItemProps) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity((q) => q + 1);
    const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (e.target.value === "") {
            setQuantity(1);
        }
    };

    const handleRemove = () => {
        console.log("Removed item ID:", id);
    };

    return (
        <Card className="flex items-center gap-4 rounded-none border-0 border-b border-zinc-200 px-0 py-5 shadow-none">
            {/* Product Image */}
            <div className="relative me-4 h-[9rem] w-[7.3rem] flex-shrink-0 overflow-hidden rounded-md border-transparent">
                <Image src={image} alt={name} fill className="rounded-sm object-cover" />
            </div>

            <div className="flex flex-1 flex-col gap-12">
                {/* Product Info */}
                <CardContent className="flex justify-between p-0">
                    <div>
                        <h3 className="text-maroon-700 text-lg font-semibold">{name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="h-5 w-5 fill-[#FFA508] text-[#FFA508]" />
                            <p className="font-primary text-base leading-[100%] font-normal">
                                Rating: <span className="font-primary text-base leading-[100%] font-medium">{rating}/5</span>
                            </p>

                            <Link href="#" className="font-primary ml-1 text-lg leading-[100%] font-medium text-blue-500 hover:underline">
                                ({reviews} ratings)
                            </Link>
                        </div>
                    </div>

                    <Button variant="red" size="icon" onClick={handleRemove} className="!flex h-10 w-24 items-center justify-center">
                        <Trash2 className="h-4 w-4" />
                        Remove
                    </Button>
                </CardContent>

                {/* Quantity & Price */}
                <div className="flex justify-between">
                    {/* Price */}
                    <div className="flex items-center justify-center gap-1">
                        <div className="font-primary text-maroon-600 align-middle text-base leading-[100%] font-medium">(x{quantity})</div>
                        <div className="font-primary mt-1 align-middle text-[24px] leading-[100%] font-bold text-gray-900">
                            {(price * quantity).toFixed(2)} <span className="text-[14px]">EGP</span>
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-1 flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleDecrease}
                            className="!flex h-12 w-12 items-center justify-center"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <Input
                            type="number"
                            min="1"
                            max="10"
                            value={quantity}
                            onChange={handleChange}
                            className="font-primary focus:ring-maroon-600 h-[49px] w-[6.5rem] rounded-[10px] border border-gray-300 p-4 text-center text-[16px] leading-[100%] font-medium focus:ring-2 focus:outline-none"
                        />

                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleIncrease}
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
