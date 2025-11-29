import { PRODUCT_DASHBOARD_STEPS } from "@lib/constants/product-dashboard.constant";

export type ProductDashboardSteps = (typeof PRODUCT_DASHBOARD_STEPS)[keyof typeof PRODUCT_DASHBOARD_STEPS];

export interface searchParams {
    page?: string;
    limit?: number;
    rating?: number;
    keyword?: string;
}
