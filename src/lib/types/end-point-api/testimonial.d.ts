// Type definitions for Testimonial features

// Defines the structure of a User object
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
}

// Defines the structure of a Testimonial object
export interface Testimonial {
    _id: string;
    user: User;
    rating: number;
    content: string;
    status: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Metadata for paginated testimonial responses
export interface TestimonialsMetadata {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
}

// Structure of the response when fetching testimonials
export interface TestimonialsResponse {
    message: string;
    metadata: TestimonialsMetadata;
    testimonials: Testimonial[];
}
