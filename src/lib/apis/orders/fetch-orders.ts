import { OrdersResponse } from "@lib/types/end-point-api/orders";

export async function fetchOrders(): Promise<OrdersResponse> {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIxNTMxMzF9.SIiveq3jRrPKsO4o0via-jeiIHOe26SJXa4jyKOOpn8";
    try {
        const res = await fetch("https://flower.elevateegy.com/api/v1/orders", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
        });

        if (!res.ok) {
            // HTTP error
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: OrdersResponse = await res.json();
        return data;
    } catch (error) {
        // Handle network errors or JSON parse errors
        console.error("Failed to fetch orders:", error);
        throw new Error("Failed to fetch orders. Please try again later.");
    }
}
