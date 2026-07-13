export interface RevenuePoint {
    month: string;
    revenue: number;
}

export const monthlyRevenue: RevenuePoint[] = [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 45500 },
    { month: 'Mar', revenue: 51200 },
    { month: 'Apr', revenue: 48800 },
    { month: 'May', revenue: 56300 },
    { month: 'Jun', revenue: 61900 },
    { month: 'Jul', revenue: 59400 },
    { month: 'Aug', revenue: 64700 },
    { month: 'Sep', revenue: 70100 },
    { month: 'Oct', revenue: 68300 },
    { month: 'Nov', revenue: 74600 },
    { month: 'Dec', revenue: 81200 }
];

export interface ProductRevenuePoint {
    product: string;
    revenue: number;
}

export const revenueByProduct: ProductRevenuePoint[] = [
    { product: 'Core', revenue: 320000 },
    { product: 'Cloud', revenue: 240000 },
    { product: 'Services', revenue: 150000 },
    { product: 'Add-ons', revenue: 90000 }
];
