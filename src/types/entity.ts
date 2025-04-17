import type { BasicStatus, PermissionType } from "./enum";

export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
}

export interface UserInfo {
	id: string;
	username: string;
	email: string;
	permissions?: string[];
	has_submitted_website?: boolean;
}

export interface Organization {
	id: string;
	name: string;
	status: "enable" | "disable";
	desc?: string;
	order?: number;
	children?: Organization[];
}

export interface Permission {
	id: string;
	parentId: string;
	name: string;
	label: string;
	type: PermissionType;
	route: string;
	status?: BasicStatus;
	order?: number;
	icon?: string;
	component?: string;
	hide?: boolean;
	hideTab?: boolean;
	frameSrc?: URL;
	newFeature?: boolean;
	children?: Permission[];
}

export interface Role {
	id: string;
	name: string;
	label: string;
	status: BasicStatus;
	order?: number;
	desc?: string;
	permission?: Permission[];
}

export interface SdkWizardData {
	id: number;
	user_id: number;
	platform: string;
	store_url: string;
	database_access: string;
	field_mappings?: Record<string, string>;
	woo_commerce_secret_key?: string;
	woo_commerce_client_key?: string;
	is_data_extracted: boolean;
	fields?: Record<string, any>;
}
