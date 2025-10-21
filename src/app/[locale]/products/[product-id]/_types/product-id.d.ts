import { ProductResponse } from "@lib/types/products";

export type CartRequest = {
    product: string;
    quantity: number;
};

export interface CartResponse {
    message: string;
    numOfCartItems: number;
    cart: Cart;
}

export interface Cart {
    _id: string;
    user: string;
    cartItems: CartItem[];
    appliedCoupons: string[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CartItem {
    product: ProductResponse;
    price: number;
    quantity: number;
    _id: string;
}
