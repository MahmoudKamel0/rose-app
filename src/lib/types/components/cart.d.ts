// product type for cart
export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    imgCover: string;
    images: string[];
    price: number;
    priceAfterDiscount: number;
    quantity: number;
    category: string;
    occasion: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    sold: number;
    rateAvg: number;
    rateCount: number;
    id: string;
}

// cart type
export interface CartItem {
    _id: string;
    price: number;
    quantity: number;
    product: Product;
}

// cart data
export interface CartData {
    _id: string;
    user: string;
    cartItems: CartItem[];
    appliedCoupons: any[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// cart success response
export interface CartSuccessResponse {
    message: string;
    numOfCartItems: number;
    cart: CartData;
}

// cart error response
export interface CartErrorResponse {
    message?: string;
    error?: string;
}

// api response
export interface ApiResponse<T> {
    ok: boolean;
    status: number;
    payload: T | CartErrorResponse;
}
