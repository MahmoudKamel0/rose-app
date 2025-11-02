// Related product item type
export interface RelatedProduct {
    id: string;
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    priceAfterDiscount: number;
    rateAvg: number;
    rateCount: number;
}

// Success response type
export interface RelatedProductsResponse {
    message: string;
    count: number;
    relatedProducts: RelatedProduct[];
}

// Error response type
export interface RelatedProductsErrorResponse {
    error: string;
}

// Unified response type
export type RelatedResponse = RelatedProductsResponse | RelatedProductsErrorResponse;
