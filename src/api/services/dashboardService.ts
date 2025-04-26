import apiClient from "../apiClient";

export enum DashboardApi {
	Stats = "/dashboard/stats",
	IntentUsageArea = "/dashboard/intent-usage-area",
	IntentUsage = "/dashboard/intent-usage",
	TopProducts = "/dashboard/top-products",
	TopBrands = "/dashboard/top-brands",
	TopInstalledCountries = "/dashboard/top-installed-countries",
}

// Define types for the API responses
export interface DashboardStats {
	weekly_sales: string;
	new_users: string;
	new_orders: string;
	bug_reports: string;
}

export interface IntentUsageAreaData {
	[year: string]: Array<{
		name: string;
		data: number[];
	}>;
}

export interface IntentUsageData {
	series: number[];
	labels: string[];
}

export interface TopProduct {
	key: string;
	id: string;
	category: string;
	price: string;
	status: string;
}

export interface TopBrand {
	logo: string;
	title: string;
	platform: string;
	type: string;
	star: number;
	reviews: string;
}

export interface TopInstalledCountry {
	country: string;
	coordinates: [number, number];
	android: string;
	windows: string;
	ios: string;
}

// API functions
const getDashboardStats = () =>
	apiClient.get<DashboardStats>({
		url: DashboardApi.Stats,
	});

const getIntentUsageArea = () =>
	apiClient.get<IntentUsageAreaData>({
		url: DashboardApi.IntentUsageArea,
	});

const getIntentUsage = () =>
	apiClient.get<IntentUsageData>({
		url: DashboardApi.IntentUsage,
	});

const getTopProducts = () =>
	apiClient.get<TopProduct[]>({
		url: DashboardApi.TopProducts,
	});

const getTopBrands = () =>
	apiClient.get<TopBrand[]>({
		url: DashboardApi.TopBrands,
	});

const getTopInstalledCountries = () =>
	apiClient.get<TopInstalledCountry[]>({
		url: DashboardApi.TopInstalledCountries,
	});

export default {
	getDashboardStats,
	getIntentUsageArea,
	getIntentUsage,
	getTopProducts,
	getTopBrands,
	getTopInstalledCountries,
};
