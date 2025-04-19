import apiClient from "@/api/apiClient";

export interface BillingPlan {
	id: number;
	name: string;
	description: string | null;
	price: number;
	features: string[];
	is_active: boolean;
	created_at: string;
	updated_at: string | null;
}

export interface UserSubscription {
	id: number;
	user_id: number;
	plan_id: number;
	status: string;
	start_date: string;
	end_date: string;
	created_at: string;
	updated_at: string | null;
	plan: BillingPlan;
}

export interface BillingHistory {
	id: number;
	user_id: number;
	plan_id: number;
	amount: number;
	status: string;
	payment_date: string;
	created_at: string;
	plan: BillingPlan;
}

export interface UsageStats {
	id: number;
	user_id: number;
	api_calls_used: number;
	api_calls_limit: number;
	storage_used: number;
	storage_limit: number;
	team_members_used: number;
	team_members_limit: number;
	created_at: string;
	updated_at: string | null;
}

export interface CurrentPlan {
	plan: BillingPlan;
	subscription: UserSubscription;
	usage_stats: UsageStats;
}

// Get all billing plans
export async function getBillingPlans() {
	return apiClient.get<BillingPlan[]>({
		url: "/billing/plans",
	});
}

// Get a specific billing plan
export async function getBillingPlan(planId: number) {
	return apiClient.get<BillingPlan>({
		url: `/billing/plans/${planId}`,
	});
}

// Get current user's plan, subscription, and usage stats
export async function getCurrentPlan() {
	return apiClient.get<CurrentPlan>({
		url: "/billing/current-plan",
	});
}

// Subscribe to a plan
export async function subscribeToPlan(planId: number) {
	return apiClient.post<UserSubscription>({
		url: `/billing/subscribe/${planId}`,
		// This endpoint will:
		// 1. Cancel any existing active subscription
		// 2. Create a new subscription for the selected plan
		// 3. Update usage limits based on the new plan
	});
}

// Get billing history
export async function getBillingHistory() {
	return apiClient.get<BillingHistory[]>({
		url: "/billing/history",
	});
}

// Get usage stats
export async function getUsageStats() {
	return apiClient.get<UsageStats>({
		url: "/billing/usage",
	});
}
