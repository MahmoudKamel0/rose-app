export interface RecommendationItem {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    priceAfterDiscount?: number;
    discount: number;
    rateAvg: number;
    rateCount: number;
    id: string;
}

export interface RecommendationsSuccessResponse {
    message: string;
    count: number;
    recommendations: RecommendationItem[];
}

export interface RecommendationsErrorResponse {
    error: string;
}

export type RecommendationsResponse = RecommendationsSuccessResponse | RecommendationsErrorResponse;
