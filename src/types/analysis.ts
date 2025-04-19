export interface DateRange {
	start: string;
	end: string;
}

export interface ProductEngagementTrend {
	date: string;
	views: number;
	clicks: number;
	conversions: number;
	engagement_rate: number;
}

export interface ProductEngagementResponse {
	trends: ProductEngagementTrend[];
	period: DateRange;
}

export interface SalesPerformanceData {
	date: string;
	revenue: number;
	orders: number;
	average_order_value: number;
	growth_rate: number;
}

export interface SalesPerformanceResponse {
	performance: SalesPerformanceData[];
	period: DateRange;
}

export interface IntentQueryTrend {
	date: string;
	intents: {
		[key: string]: number;
	};
	total_queries: number;
}

export interface IntentQueryResponse {
	trends: IntentQueryTrend[];
	period: DateRange;
}

export interface UserSegment {
	name: string;
	count: number;
	percentage: number;
	avg_session_duration: number;
	features_used: number;
}

export interface UserSegmentationResponse {
	segments: UserSegment[];
	total_users: number;
}

export interface SystemMetric {
	date: string;
	response_time: number;
	error_rate: number;
	cpu_usage: number;
	memory_usage: number;
	active_users: number;
}

export interface SystemPerformanceResponse {
	metrics: SystemMetric[];
	period: DateRange;
}

export interface ProductMention {
	name: string;
	mentions: number;
	sentiment_score: number;
	trend: "up" | "down" | "stable";
	growth_rate: number;
}

export interface MostMentionedProductsResponse {
	products: ProductMention[];
	period: DateRange;
}
