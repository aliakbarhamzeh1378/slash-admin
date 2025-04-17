import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";

import { t } from "@/locales/i18n";
import userStore from "@/store/userStore";

import { toast } from "sonner";
import type { Result } from "#/api";
import { ResultEnum } from "#/enum";

// Create axios instance
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 50000,
	headers: { "Content-Type": "application/json;charset=utf-8" },
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Add authorization header if token exists
		const userToken = userStore.getState().userToken;
		if (userToken?.accessToken) {
			config.headers.Authorization = `Bearer ${userToken.accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(res: AxiosResponse<Result>) => {
		if (!res.data) throw new Error(t("sys.api.apiRequestFailed"));

		// Transform auth response to match expected format
		if (res.config.url?.includes("/auth/signin") || res.config.url?.includes("/auth/signup")) {
			// The response is already in the correct format, just return it
			return res.data;
		}

		// Check if response has the standard format (status, data, message)
		const hasStandardFormat = Reflect.has(res.data, "status") && Reflect.has(res.data, "data");

		if (hasStandardFormat) {
			const { status, data, message } = res.data;

			// Business request success
			if (data && status === ResultEnum.SUCCESS) {
				return data;
			}

			// Business request error
			throw new Error(message || t("sys.api.apiRequestFailed"));
		}

		// If response doesn't have standard format, return the data directly
		return res.data;
	},
	(error: AxiosError<Result>) => {
		const { response, message } = error || {};

		const errMsg = response?.data?.message || message || t("sys.api.errorMessage");
		toast.error(errMsg, {
			position: "top-center",
		});

		const status = response?.status;
		if (status === 401) {
			userStore.getState().actions.clearUserInfoAndToken();
		}
		return Promise.reject(error);
	},
);

class APIClient {
	get<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "GET" });
	}

	post<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "POST" });
	}

	put<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "PUT" });
	}

	delete<T = any>(config: AxiosRequestConfig): Promise<T> {
		return this.request({ ...config, method: "DELETE" });
	}

	request<T = any>(config: AxiosRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.request<any, AxiosResponse<Result>>(config)
				.then((res: AxiosResponse<Result>) => {
					resolve(res as unknown as Promise<T>);
				})
				.catch((e: Error | AxiosError) => {
					reject(e);
				});
		});
	}
}

export default new APIClient();
