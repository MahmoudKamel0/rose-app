import { Metadata, Product } from "./products";


// OrderItem type
export interface OrderItem {
    _id: string;
    product: Product;
    price: number;
    quantity: number;
}

// Single Order type
export interface Order {
    _id: string;
    user: string;
    orderItems: OrderItem[];
    totalPrice: number;
    paymentType: "cash" | "credit card"; // adjust if API can return other types
    isPaid: boolean;
    isDelivered: boolean;
    state: "pending" | "cancelled" | "delivered"; // adjust according to API
    createdAt: string;
    updatedAt: string;
    orderNumber: string;
    __v: number;
}


// Full API Response
export interface OrdersResponse {
    message: string;
    metadata: Metadata;
    orders: Order[];
}
