// Product type
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
  isSuperAdmin: boolean;
  rateAvg: number;
  rateCount: number;
  id: string;
}

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

// Metadata type
export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

// Full API Response
export interface OrdersResponse {
  message: string;
  metadata: Metadata;
  orders: Order[];
}
