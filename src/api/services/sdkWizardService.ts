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
}

export interface ConnectionValidationRequest {
	platform: string;
	store_url: string;
	woo_commerce_secret_key?: string;
	woo_commerce_client_key?: string;
}

// Make ExtractedProduct more flexible to handle any fields
export interface ExtractedProduct {
	[key: string]: any; // Allow any string key with any value type
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
};

export default sdkWizardService;
