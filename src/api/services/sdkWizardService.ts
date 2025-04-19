import type { SdkWizardData } from "#/entity";
import apiClient from "../apiClient";

export interface SdkWizardDataRequest {
	platform: string;
	store_url: string;
	database_access: string;
	field_mappings?: Record<string, string>;
	woo_commerce_secret_key?: string;
	woo_commerce_client_key?: string;
	is_data_extracted?: boolean;
	fields?: Record<string, any>;
	selected_fields?: string[];
	backup_enabled?: boolean;
	backup_frequency?: "hourly" | "daily" | "weekly";
	documentation_links?: string[];
	documentation_files?: Array<{
		name: string;
		size: number;
		type: string;
		lastModified: number;
	}>;
}

export interface ConnectionValidationRequest {
	platform: string;
	store_url: string;
	woo_commerce_secret_key?: string;
	woo_commerce_client_key?: string;
}

// Make ExtractedProduct more flexible to handle any fields
export interface ExtractedProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	images: string[];
	variants: any[];
	metadata: Record<string, any>;
}

export interface ExtractDataRequest {
	store_url: string;
	platform: string;
}

const sdkWizardService = {
	validateConnection: (data: ConnectionValidationRequest) => {
		return apiClient.post<{ success: boolean; message: string }>({
			url: "/sdk-wizard/validate-connection",
			data,
		});
	},

	createData: (data: SdkWizardDataRequest) => {
		return apiClient.post<SdkWizardData>({
			url: "/sdk-wizard/data",
			data,
		});
	},

	getData: () => {
		return apiClient.get<SdkWizardData>({
			url: "/sdk-wizard/data",
		});
	},

	updateData: (data: Partial<SdkWizardDataRequest>) => {
		return apiClient.put<SdkWizardData>({
			url: "/sdk-wizard/data",
			data,
		});
	},

	extractData: (data: ExtractDataRequest) => {
		return apiClient.post<{ success: boolean; data: ExtractedProduct[]; message: string }>({
			url: "/sdk-wizard/extract-data",
			data,
		});
	},

	completeWizard: () => {
		return apiClient.post<{ message: string }>({
			url: "/sdk-wizard/complete",
		});
	},

	getDashboard: () => {
		return apiClient.get<{
			stats: {
				totalIntegrations: number;
				activeIntegrations: number;
				pendingUpdates: number;
				healthScore: number;
			};
			recent_activities: Array<{
				id: number;
				type: string;
				message: string;
				time: string;
			}>;
		}>({
			url: "/sdk-wizard/dashboard",
		});
	},
};

export default sdkWizardService;
