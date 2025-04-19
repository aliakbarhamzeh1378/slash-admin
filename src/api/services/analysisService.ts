import type {
	IntentQueryResponse,
	MostMentionedProductsResponse,
	ProductEngagementResponse,
	SalesPerformanceResponse,
	SystemPerformanceResponse,
	UserSegmentationResponse,
} from "@/types/analysis";
import apiClient from "../apiClient";

export enum AnalysisApi {
	Product = "/analysis/product",
	Sales = "/analysis/sales",
	Intent = "/analysis/intent",
	UserSegmentation = "/analysis/user-segmentation",
	System = "/analysis/system",
	Mentions = "/analysis/mentions",
}

interface DateRangeParams {
	start_date?: string;
	end_date?: string;
}

const getProductEngagement = (params?: DateRangeParams) =>
	apiClient.get<ProductEngagementResponse>({
		url: AnalysisApi.Product,
		params,
	});

const getSalesPerformance = (params?: DateRangeParams) =>
	apiClient.get<SalesPerformanceResponse>({
		url: AnalysisApi.Sales,
		params,
	});

const getIntentQueryTrends = (params?: DateRangeParams) =>
	apiClient.get<IntentQueryResponse>({
		url: AnalysisApi.Intent,
		params,
	});

const getUserSegmentation = () =>
	apiClient.get<UserSegmentationResponse>({
		url: AnalysisApi.UserSegmentation,
	});

const getSystemPerformance = (params?: DateRangeParams) =>
	apiClient.get<SystemPerformanceResponse>({
		url: AnalysisApi.System,
		params,
	});

const getMostMentionedProducts = (params?: DateRangeParams & { limit?: number }) =>
	apiClient.get<MostMentionedProductsResponse>({
		url: AnalysisApi.Mentions,
		params,
	});

export default {
	getProductEngagement,
	getSalesPerformance,
	getIntentQueryTrends,
	getUserSegmentation,
	getSystemPerformance,
	getMostMentionedProducts,
};
