declare type OverallStatisticsResponseType = {
    statistics: {
        totalProducts: number;
        totalOrders: number;
        totalCategories: number;
        totalRevenue: number;
    };
};
type AllCategories = {
    _id: string;
    name: string;
    totalProducts: number;
    totalRevenue: number;
};

declare type AllCategoriesResponseType = {
    statistics: AllCategories[];
};
