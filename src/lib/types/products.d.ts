export type ProductResponse = {
    product: {
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
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        __v: number;
        isSuperAdmin: boolean;
        sold: number;
        rateAvg: number;
        rateCount: number;
        favoriteId: string | null;
        isInWishlist: boolean;
    };
};

