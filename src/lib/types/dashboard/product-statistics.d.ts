export interface Product {
    _id: string;
    title: string;
    price: number;
    imgCover: string;
    quantity?: number;
    sold?: number;
    id?: string;
}

export interface CategoryStatistics {
    _id: string;
    count: number;
    category: string;
    products: Product[];
}

export interface StatisticsData {
    productsByCategory: CategoryStatistics[];
    topSellingProducts: Product[];
    lowStockProducts: Product[];
}

export interface StatisticsResponse {
    message: string;
    statistics: StatisticsData;
}

export interface ApiError {
    error: string;
}
