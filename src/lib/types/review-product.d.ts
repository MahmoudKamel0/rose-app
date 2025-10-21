// Review related types
export interface ProductInfo {
    _id: string;
    title: string;
    imgCover: string;
    id: string;
}

// User information type
export interface UserInfo {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
}

// Review type
export interface Review {
    _id: string;
    product: ProductInfo;
    user: UserInfo;
    rating: number;
    title: string;
    comment: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Metadata for paginated reviews
export interface ReviewsMetadata {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
}

// Successful response structure
export interface ReviewsSuccessResponse {
    message: "success";
    metadata: ReviewsMetadata;
    reviews: Review[];
}

// Error response structure
export interface ReviewsErrorResponse {
    error: string;
}

/** Union type for both possible responses */
export type ReviewsResponse = ReviewsSuccessResponse | ReviewsErrorResponse;

// Props for ReviewsSection component
export interface ReviewsSectionProps {
    productId: string;
}
