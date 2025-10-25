import { getAuthHeaders } from "@lib/utils/get-auth-headers.util";

export default async function getAllWishlist() {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${process.env.BASE_URL}/wishlist`, {
            headers,
        });

        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();

    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {       
        throw new Error("Something went wrong while loading products. Please try again later.");    
    }
}
