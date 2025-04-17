import sdkWizardService from "@/api/services/sdkWizardService";
import type { ExtractedProduct, SdkWizardDataRequest } from "@/api/services/sdkWizardService";
import Card from "@/components/card";
import { useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Define the steps for the wizard
const STEPS = [
	{
		id: "platform-selection",
		title: "Platform Selection",
		description: "Select your eCommerce platform and provide necessary details",
	},
	{
		id: "data-extraction",
		title: "Data Extraction",
		description: "Connect to your platform to extract product data",
	},
	{
		id: "fields-mapping",
		title: "Fields Mapping",
		description: "Map your data fields to our standardized schema",
	},
	{
		id: "data-embedding",
		title: "Data Embedding & SDK Generation",
		description: "Process data and generate SDK credentials",
	},
	{
		id: "completion",
		title: "Completion",
		description: "Your chatbot is ready for integration",
	},
];

// Define the form data interface
type BackupFrequency = "hourly" | "daily" | "weekly";

interface FormData extends SdkWizardDataRequest {
	isDataExtracted: boolean;
	extractedFields?: string[];
	extractedProducts?: ExtractedProduct[];
	field_mappings: Record<string, string>;
	selectedFields: Record<string, boolean>;
	backupFrequency: BackupFrequency;
	arrayIdentifiers: Record<string, string>;
	productIdentifier: string;
}

// Define the props for the component
interface SdkWizardProps {
	className?: string;
}

// Define the props for step components
interface StepProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FieldSelectionProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	firstProduct: any;
}

// Define the component
export default function SdkWizard({ className }: SdkWizardProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		platform: "Shopify",
		store_url: "https://kith.com/",
		database_access: "mysql://user:password@localhost:3306/database",
		field_mappings: {},
		woo_commerce_secret_key: "",
		woo_commerce_client_key: "",
		is_data_extracted: false,
		fields: {
			id: "string",
			name: "string",
			description: "text",
			price: "number",
			category: "string",
			images: "array",
			variants: "array",
			metadata: "object",
		},
		isDataExtracted: false,
		selectedFields: {},
		backupFrequency: "daily",
		arrayIdentifiers: {},
		productIdentifier: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isValidated, setIsValidated] = useState(false);

	const handleNext = async () => {
		if (currentStep === 0 && !isValidated) {
			toast.error("Please validate your connection first");
			return;
		}

		// Check if data has been extracted when on the Data Extraction step
		if (currentStep === 1 && !formData.isDataExtracted) {
			toast.error("Please extract data before proceeding");
			return;
		}

		// Check if at least one field is selected when on the Fields Mapping step
		if (currentStep === 2) {
			const selectedFieldsCount = Object.values(formData.selectedFields).filter(Boolean).length;
			if (selectedFieldsCount === 0) {
				toast.error("Please select at least one field to include in the chatbot");
				return;
			}
		}

		try {
			if (currentStep === 0) {
				setIsLoading(true);

				// Directly call the extractData function without creating SDK wizard data first
				const response = await sdkWizardService.extractData({
					store_url: formData.store_url,
					platform: formData.platform,
				});

				if (response.success) {
					setFormData((prev) => ({ ...prev, isDataExtracted: true }));
					toast.success(response.message);
				} else {
					toast.error(response.message);
					return;
				}
			}
			setCurrentStep((prev) => prev + 1);
		} catch (error: any) {
			console.error("Error extracting data:", error);
			toast.error(error.response?.data?.detail || "Failed to extract data. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handlePrevious = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const renderStepContent = () => {
		const stepProps = {
			formData,
			setFormData,
			isLoading,
			setIsLoading,
			setIsValidated,
		};

		switch (currentStep) {
			case 0:
				return <PlatformSelectionStep {...stepProps} />;
			case 1:
				return <DataExtractionStep {...stepProps} />;
			case 2:
				return <FieldsMappingStep {...stepProps} />;
			case 3:
				return <DataEmbeddingStep {...stepProps} />;
			case 4:
				return <CompletionStep formData={formData} />;
			default:
				return null;
		}
	};

	return (
		<Card className={cn("w-full mx-auto flex flex-col max-w-6xl", className)}>
			{/* Header section */}
			<div className="relative mb-8 pb-6 border-b">
				<div className="flex items-center mb-2">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
						<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>SDK setup icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</div>
					<div>
						<h1 className="text-2xl font-bold">SDK Setup Process</h1>
						<p className="text-gray-500">Follow the steps below to set up your SDK</p>
					</div>
				</div>

				{/* Progress steps */}
				<div className="mt-8">
					<div className="flex justify-between mb-2">
						{STEPS.map((step, index) => (
							<div key={step.id} className="flex-1 text-center">
								<div className="relative">
									<div
										className={cn(
											"w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all relative z-10",
											index < currentStep
												? "bg-primary text-white ring-4 ring-primary/20"
												: index === currentStep
													? "bg-primary text-white ring-4 ring-primary/20"
													: "bg-gray-100 text-gray-500",
										)}
									>
										{index < currentStep ? (
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<title>Step completed</title>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
											</svg>
										) : (
											<span>{index + 1}</span>
										)}
									</div>
									{index < STEPS.length - 1 && (
										<div
											className={cn(
												"absolute top-5 left-1/2 w-full h-0.5 transition-all z-0",
												index < currentStep ? "bg-primary" : "bg-gray-200",
											)}
										/>
									)}
								</div>
								<div className="mt-2">
									<div className={cn("text-sm font-medium", index <= currentStep ? "text-primary" : "text-gray-500")}>
										{step.title}
									</div>
									<div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Loading overlay */}
			{isLoading && (
				<div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
					<div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
						<div className="w-16 h-16 relative">
							<div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-8 h-8 bg-white rounded-full" />
							</div>
						</div>
						<p className="mt-4 text-primary font-medium">Processing...</p>
						<p className="text-sm text-gray-500">Please wait while we process your request</p>
					</div>
				</div>
			)}

			{/* Step content container */}
			<div className="flex-1 min-h-[400px]">
				{/* Current step info */}
				<div className="mb-6 bg-gray-50 p-4 rounded-lg border">
					<h2 className="text-xl font-semibold">{STEPS[currentStep].title}</h2>
					<p className="text-gray-500">{STEPS[currentStep].description}</p>
				</div>

				{/* Step content */}
				<div className="relative">{renderStepContent()}</div>
			</div>

			{/* Navigation buttons */}
			<div className="flex justify-between items-center mt-8 pt-6 border-t gap-4">
				{currentStep > 0 && (
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={currentStep === 0 || isLoading}
						className="min-w-[120px] bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
					>
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Previous step</title>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
						</svg>
						Previous
					</Button>
				)}
				{!currentStep && <div />} {/* Spacer when no Previous button */}
				{currentStep < STEPS.length - 1 && (
					<Button
						onClick={handleNext}
						disabled={
							currentStep === STEPS.length - 1 ||
							isLoading ||
							(currentStep === 1 && !formData.isDataExtracted) ||
							(currentStep === 2 && Object.values(formData.selectedFields).filter(Boolean).length === 0)
						}
						className="min-w-[120px] bg-primary hover:bg-primary/90 text-white shadow-sm"
					>
						Next
						<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Next step</title>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
						</svg>
					</Button>
				)}
			</div>
		</Card>
	);
}

// Step components
function PlatformSelectionStep({ formData, setFormData, isLoading, setIsLoading, setIsValidated }: StepProps) {
	const platforms = [
		{
			id: "Shopify",
			name: "Shopify",
			description: "Popular cloud-based e-commerce platform",
			docsUrl: "https://shopify.dev/docs/api",
			dataPreview: ["Products", "Collections", "Orders", "Customers", "Inventory"],
			icon: (
				<svg className="w-8 h-8 text-[#96BF47]" viewBox="0 0 24 24" fill="currentColor">
					<title>Shopify logo</title>
					<path d="M15.44 3.45c-.15-.04-.3-.07-.44-.07-.65 0-1.17.3-1.56.83-.34.47-.5 1.07-.55 1.75l-2.57.2c0-.03-.14-2.44-.14-2.44s-2.15-.2-2.15-.2L5.89 18.4l7.43.53 4.36-1.13c-.01-.02-2.24-14.35-2.24-14.35zM12.8 5.93l-1.72.13c.17-.97.53-1.45 1.12-1.45.17 0 .3.03.4.08l.2 1.24z" />
				</svg>
			),
		},
		{
			id: "WooCommerce",
			name: "WooCommerce",
			description: "WordPress-based e-commerce solution",
			docsUrl: "https://woocommerce.com/document/woocommerce-rest-api/",
			dataPreview: ["Products", "Categories", "Orders", "Customers", "Coupons"],
			icon: (
				<svg className="w-8 h-8 text-[#96588A]" viewBox="0 0 24 24" fill="currentColor">
					<title>WooCommerce logo</title>
					<path d="M19 2H5C3.3 2 2 3.3 2 5v14c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3zm-2.5 14.5c-.6.6-1.5.9-2.4.9-.9 0-1.8-.3-2.4-.9l-3.2-3.2c-.6-.6-.9-1.5-.9-2.4 0-.9.3-1.8.9-2.4l3.2-3.2c.6-.6 1.5-.9 2.4-.9.9 0 1.8.3 2.4.9l3.2 3.2c.6.6.9 1.5.9 2.4 0 .9-.3 1.8-.9 2.4l-3.2 3.2z" />
				</svg>
			),
		},
		{
			id: "Magento",
			name: "Magento",
			description: "Enterprise-level e-commerce platform (Coming Soon)",
			docsUrl: "https://devdocs.magento.com/",
			dataPreview: ["Products", "Categories", "Orders", "Customers", "Inventory", "Promotions"],
			disabled: true,
			icon: (
				<svg className="w-8 h-8 text-[#F26322] opacity-40" viewBox="0 0 24 24" fill="currentColor">
					<title>Magento logo</title>
					<path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6 3.3v7.8l-6 3.3-6-3.3V7.6l6-3.3z" />
				</svg>
			),
		},
		{
			id: "Custom",
			name: "Custom Platform",
			description: "Connect your custom e-commerce solution",
			docsUrl: null,
			dataPreview: ["Custom Fields"],
			icon: (
				<svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<title>Custom platform icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
					/>
				</svg>
			),
		},
	];

	const handlePlatformSelect = (selectedPlatform: string) => {
		// Don't allow selection of disabled platforms
		if (platforms.find((p) => p.id === selectedPlatform)?.disabled) {
			toast.error("This platform is not available yet");
			return;
		}
		setFormData((prev) => ({ ...prev, platform: selectedPlatform }));
		setIsValidated(false);
	};

	const handleStoreUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, store_url: e.target.value }));
		setIsValidated(false);
	};

	const handleWooCommerceSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, woo_commerce_secret_key: e.target.value }));
		setIsValidated(false);
	};

	const handleWooCommerceClientKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, woo_commerce_client_key: e.target.value }));
		setIsValidated(false);
	};

	const handleValidateConnection = async () => {
		try {
			setIsLoading(true);

			const validationResponse = await sdkWizardService.validateConnection({
				platform: formData.platform,
				store_url: formData.store_url,
				woo_commerce_secret_key: formData.woo_commerce_secret_key,
				woo_commerce_client_key: formData.woo_commerce_client_key,
			});

			if (validationResponse.success) {
				setIsValidated(true);
				toast.success(validationResponse.message);
			}
		} catch (error: any) {
			console.error("Error validating connection:", error);
			setIsValidated(false);
			toast.error(error.response?.data?.detail || "Failed to validate connection. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			{/* Platform selection */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{platforms.map((platform) => (
					<button
						key={platform.id}
						type="button"
						className={cn(
							"relative p-6 border-2 rounded-xl text-left transition-all duration-200 group",
							platform.disabled
								? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
								: formData.platform === platform.id
									? "border-primary bg-primary/5 ring-2 ring-primary/20"
									: "border-gray-200 hover:border-primary/50",
						)}
						onClick={() => handlePlatformSelect(platform.id)}
						disabled={platform.disabled}
					>
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0">{platform.icon}</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-gray-900">{platform.name}</h3>
									{formData.platform === platform.id && !platform.disabled && (
										<svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Selected platform</title>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
										</svg>
									)}
								</div>
								<p className="mt-1 text-sm text-gray-500">{platform.description}</p>
								<div className="mt-3">
									<div className="text-xs font-medium text-gray-500 mb-1.5">Available Data:</div>
									<div className="flex flex-wrap gap-1.5">
										{platform.dataPreview.map((item) => (
											<span
												key={item}
												className={cn(
													"inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
													platform.disabled
														? "bg-gray-100 text-gray-500"
														: "bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors",
												)}
											>
												{item}
											</span>
										))}
									</div>
								</div>
								{platform.docsUrl && !platform.disabled && (
									<a
										href={platform.docsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center mt-3 text-sm text-primary hover:text-primary/80 font-medium"
										onClick={(e) => e.stopPropagation()}
									>
										View Documentation
										<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>External link</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</a>
								)}
							</div>
						</div>
					</button>
				))}
			</div>

			{/* Connection details */}
			{formData.platform && formData.platform !== "Custom" && (
				<div className="bg-white border rounded-xl shadow-sm overflow-hidden">
					<div className="p-6">
						<h3 className="text-lg font-semibold mb-4">Connection Details</h3>
						<div className="space-y-6">
							<div>
								<label htmlFor="store-url" className="block text-sm font-medium mb-2">
									Store URL
									<span className="text-red-500 ml-1">*</span>
								</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Store URL icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
											/>
										</svg>
									</div>
									<input
										id="store-url"
										type="url"
										className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
										placeholder="https://your-store.com"
										value={formData.store_url}
										onChange={handleStoreUrlChange}
									/>
								</div>
							</div>

							{formData.platform === "WooCommerce" && (
								<div className="space-y-6 border-t pt-6">
									<div>
										<label htmlFor="woo-secret-key" className="block text-sm font-medium mb-2">
											WooCommerce Secret Key
											<span className="text-red-500 ml-1">*</span>
										</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<title>Secret key icon</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
													/>
												</svg>
											</div>
											<input
												id="woo-secret-key"
												type="password"
												className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
												placeholder="Enter your WooCommerce secret key"
												value={formData.woo_commerce_secret_key}
												onChange={handleWooCommerceSecretKeyChange}
											/>
										</div>
									</div>
									<div>
										<label htmlFor="woo-client-key" className="block text-sm font-medium mb-2">
											WooCommerce Client Key
											<span className="text-red-500 ml-1">*</span>
										</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<title>Client key icon</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
													/>
												</svg>
											</div>
											<input
												id="woo-client-key"
												type="password"
												className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
												placeholder="Enter your WooCommerce client key"
												value={formData.woo_commerce_client_key}
												onChange={handleWooCommerceClientKeyChange}
											/>
										</div>
									</div>
									<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
										<div className="flex">
											<div className="flex-shrink-0">
												<svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<title>Information icon</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											</div>
											<div className="ml-3">
												<h3 className="text-sm font-medium text-blue-800">How to find your WooCommerce API keys:</h3>
												<div className="mt-2 text-sm text-blue-700">
													<ol className="list-decimal pl-5 space-y-1">
														<li>Log in to your WordPress admin dashboard</li>
														<li>Go to WooCommerce → Settings → Advanced → REST API</li>
														<li>Click "Add key" to create a new API key</li>
														<li>Set permissions to "Read" for product data extraction</li>
														<li>Copy the Consumer Key (Client Key) and Consumer Secret (Secret Key)</li>
													</ol>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
						<Button
							onClick={handleValidateConnection}
							disabled={
								isLoading ||
								!formData.store_url ||
								(formData.platform === "WooCommerce" &&
									(!formData.woo_commerce_secret_key || !formData.woo_commerce_client_key))
							}
							className="min-w-[140px]"
						>
							{isLoading ? (
								<>
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
										<title>Loading spinner</title>
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Validating...
								</>
							) : (
								<>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<title>Validate connection icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Validate Connection
								</>
							)}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

function DataExtractionStep({ formData, setFormData, isLoading, setIsLoading, setIsValidated }: StepProps) {
	const [extractedProducts, setExtractedProducts] = useState<ExtractedProduct[]>([]);
	const [extractionStatus, setExtractionStatus] = useState<"idle" | "extracting" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [progress, setProgress] = useState(0);
	const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
	const [extractionStats, setExtractionStats] = useState<{
		totalProducts: number;
		totalFields: number;
		startTime: number | null;
		endTime: number | null;
	}>({
		totalProducts: 0,
		totalFields: 0,
		startTime: null,
		endTime: null,
	});

	const handleExtractData = async () => {
		try {
			setIsLoading(true);
			setExtractionStatus("extracting");
			setErrorMessage("");
			setProgress(0);
			setEstimatedTime(30); // Initial estimate in seconds
			setExtractionStats((prev) => ({
				...prev,
				startTime: Date.now(),
				endTime: null,
			}));

			// Simulate progress updates
			const progressInterval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) {
						clearInterval(progressInterval);
						return 90;
					}
					return prev + 10;
				});
				setEstimatedTime((prev) => (prev ? Math.max(0, prev - 1) : null));
			}, 1000);

			const response = await sdkWizardService.extractData({
				store_url: formData.store_url,
				platform: formData.platform,
			});

			clearInterval(progressInterval);
			setProgress(100);

			if (response.success) {
				const productData = response.data[0];
				const extractedFields = Object.entries(productData).reduce(
					(acc, [key, value]) => {
						acc[key] = typeof value === "object" ? (Array.isArray(value) ? "array" : "object") : typeof value;
						return acc;
					},
					{} as Record<string, string>,
				);

				const defaultSelectedFields: Record<string, boolean> = {};
				for (const field of Object.keys(extractedFields)) {
					defaultSelectedFields[field] = true;
				}

				setFormData((prev) => ({
					...prev,
					isDataExtracted: true,
					extractedFields: Object.keys(extractedFields),
					extractedProducts: response.data,
					selectedFields: defaultSelectedFields,
				}));

				setExtractionStats((prev) => ({
					...prev,
					totalProducts: response.data.length,
					totalFields: Object.keys(extractedFields).length,
					endTime: Date.now(),
				}));

				setExtractionStatus("success");
				toast.success(response.message);
			} else {
				setExtractionStatus("error");
				setErrorMessage(response.message);
				toast.error(response.message);
			}
		} catch (error: any) {
			setExtractionStatus("error");
			setErrorMessage(error.message || "Failed to extract data");
			toast.error(error.message || "Failed to extract data");
		} finally {
			setIsLoading(false);
			setEstimatedTime(null);
		}
	};

	const validateExtractedData = () => {
		if (!formData.extractedProducts?.length) {
			return false;
		}

		const requiredFields = ["id", "name", "price", "description"];
		const firstProduct = formData.extractedProducts[0];

		return requiredFields.every((field) => field in firstProduct);
	};

	const formatTimeElapsed = () => {
		if (!extractionStats.startTime || !extractionStats.endTime) return "";

		const elapsedMs = extractionStats.endTime - extractionStats.startTime;
		const seconds = Math.floor(elapsedMs / 1000);

		if (seconds < 60) {
			return `${seconds} seconds`;
		}

		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	return (
		<div className="space-y-6">
			{/* Header section with platform info */}
			<div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
						<svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Data extraction icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold">Data Extraction</h3>
						<p className="text-sm text-gray-600">Extracting product data from your {formData.platform} store</p>
					</div>
				</div>
				<div className="mt-4 text-sm text-gray-600">
					<p>This process will:</p>
					<ul className="list-disc pl-5 mt-1 space-y-1">
						<li>Connect to your {formData.platform} store</li>
						<li>Extract all product data</li>
						<li>Process and normalize the data</li>
						<li>Prepare it for the next step</li>
					</ul>
				</div>
			</div>

			{/* Initial state - Start extraction button */}
			{extractionStatus === "idle" && (
				<div className="bg-white border rounded-lg shadow-sm p-8 text-center">
					<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<h4 className="text-lg font-medium mb-2">Ready to Extract Data</h4>
					<p className="text-gray-500 mb-6 max-w-md mx-auto">
						Click the button below to start extracting product data from your {formData.platform} store. This process
						may take a few minutes depending on the amount of data.
					</p>
					<Button onClick={handleExtractData} disabled={isLoading} className="px-6 py-2">
						Start Data Extraction
					</Button>
				</div>
			)}

			{/* Extraction in progress */}
			{extractionStatus === "extracting" && (
				<div className="bg-white border rounded-lg shadow-sm p-6">
					<div className="flex items-center mb-4">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
							<svg
								className="w-5 h-5 text-primary animate-pulse"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						</div>
						<div>
							<h4 className="text-lg font-medium">Extracting Data</h4>
							<p className="text-sm text-gray-500">Please wait while we process your data</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-sm font-medium text-primary">Progress</span>
								</div>
								<div className="text-right">
									<span className="text-sm font-medium text-primary">{progress}%</span>
								</div>
							</div>
							<div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-primary/10">
								<div
									style={{ width: `${progress}%` }}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
								/>
							</div>
						</div>

						{estimatedTime !== null && (
							<div className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
								<svg
									className="w-4 h-4 mr-2 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Estimated time remaining: {estimatedTime} seconds</span>
							</div>
						)}

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Status</div>
								<div className="font-medium">Processing</div>
							</div>
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Current Step</div>
								<div className="font-medium">Extracting Products</div>
							</div>
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Connection</div>
								<div className="font-medium text-green-600">Connected</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Extraction success */}
			{extractionStatus === "success" && formData.extractedProducts && (
				<div className="space-y-6">
					<div className="bg-green-50 border border-green-200 rounded-lg p-5">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-lg font-medium text-green-800">Data extraction completed successfully</h3>
								<div className="mt-2 text-sm text-green-700">
									<p>
										We've successfully extracted {extractionStats.totalProducts} products with{" "}
										{extractionStats.totalFields} fields in {formatTimeElapsed()}.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
							<div>
								<h4 className="font-medium text-gray-900">Data Preview</h4>
								<p className="text-sm text-gray-500">{formData.extractedProducts.length} products extracted</p>
							</div>
							<div className="flex flex-wrap items-center gap-2">
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
									{extractionStats.totalFields} Fields
								</span>
								<span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
									{extractionStats.totalProducts} Products
								</span>
							</div>
						</div>

						<div className="max-h-[600px] overflow-y-auto p-4">
							<div className="grid grid-cols-1 gap-4">
								{formData.extractedProducts.slice(0, 3).map((product, index) => (
									<div key={product.id || `product-${index}`} className="border rounded-lg bg-white shadow-sm">
										<div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
											<span className="font-medium text-gray-700">Product {index + 1}</span>
											{product.id && <span className="text-xs text-gray-500">ID: {product.id}</span>}
										</div>
										<div className="p-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{Object.entries(product).map(([key, value]) => (
													<div key={key} className="space-y-1">
														<div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</div>
														{typeof value === "object" ? (
															value === null ? (
																<div className="text-sm text-gray-400 italic">null</div>
															) : Array.isArray(value) ? (
																<div className="bg-gray-50 rounded-md p-2">
																	<div className="text-xs text-gray-500 mb-1">Array ({value.length} items)</div>
																	<div className="space-y-1">
																		{value.slice(0, 2).map((item, i) => {
																			// Generate a unique key based on the item content
																			const itemKey =
																				typeof item === "object" && item !== null
																					? item.id || item.name || JSON.stringify(item)
																					: `${String(item)}-${i}`;

																			return (
																				<div key={itemKey} className="text-sm">
																					{typeof item === "object" ? (
																						<div className="relative group">
																							<pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
																								{JSON.stringify(item, null, 2)}
																							</pre>
																							<button
																								onClick={() => {
																									// Copy to clipboard
																									navigator.clipboard.writeText(JSON.stringify(item, null, 2));
																									toast.success("Copied to clipboard");
																								}}
																								className="absolute top-1 right-1 p-1 rounded-md bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
																								title="Copy to clipboard"
																								type="button"
																							>
																								<svg
																									className="w-4 h-4 text-gray-500"
																									fill="none"
																									stroke="currentColor"
																									viewBox="0 0 24 24"
																								>
																									<title>Copy to clipboard icon</title>
																									<path
																										strokeLinecap="round"
																										strokeLinejoin="round"
																										strokeWidth="2"
																										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
																									/>
																								</svg>
																							</button>
																						</div>
																					) : (
																						<div className="px-2 py-1 bg-white rounded border">{String(item)}</div>
																					)}
																				</div>
																			);
																		})}
																		{value.length > 2 && (
																			<div className="text-xs text-gray-500 italic">
																				...and {value.length - 2} more items
																			</div>
																		)}
																	</div>
																</div>
															) : (
																<div className="relative group">
																	<pre className="text-xs bg-gray-50 p-2 rounded-md overflow-x-auto">
																		{JSON.stringify(value, null, 2)}
																	</pre>
																	<button
																		onClick={() => {
																			navigator.clipboard.writeText(JSON.stringify(value, null, 2));
																			toast.success("Copied to clipboard");
																		}}
																		className="absolute top-1 right-1 p-1 rounded-md bg-white opacity-0 group-hover:opacity-100 transition-opacity"
																		title="Copy to clipboard"
																		type="button"
																	>
																		<svg
																			className="w-4 h-4 text-gray-500"
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24"
																		>
																			<title>Copy to clipboard icon</title>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth="2"
																				d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
																			/>
																		</svg>
																	</button>
																</div>
															)
														) : (
															<div className="text-sm text-gray-700">{String(value)}</div>
														)}
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{formData.extractedProducts.length > 3 && (
							<div className="text-sm text-gray-500 text-center bg-gray-50 p-3 border-t">
								Showing 3 of {formData.extractedProducts.length} products
							</div>
						)}
					</div>

					{!validateExtractedData() && (
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-yellow-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-lg font-medium text-yellow-800">Warning: Some required fields are missing</h3>
									<div className="mt-2 text-sm text-yellow-700">
										<p>The following fields are required for optimal chatbot performance:</p>
										<ul className="list-disc pl-5 mt-1 space-y-1">
											<li>id - Unique product identifier</li>
											<li>name - Product name</li>
											<li>price - Product price</li>
											<li>description - Product description</li>
										</ul>
										<p className="mt-2">
											You can still proceed, but the chatbot may not function optimally without these fields.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Extraction error */}
			{extractionStatus === "error" && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-5">
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<svg
								className="h-6 w-6 text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-lg font-medium text-red-800">Error extracting data</h3>
							<div className="mt-2 text-sm text-red-700">
								<p>{errorMessage}</p>
								<div className="mt-4">
									<Button
										variant="outline"
										onClick={handleExtractData}
										disabled={isLoading}
										className="bg-white text-red-700 border-red-300 hover:bg-red-50"
									>
										Retry Extraction
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function FieldsMappingStep({ formData, setFormData, isLoading, setIsLoading, setIsValidated }: StepProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGroup, setSelectedGroup] = useState<string>("all");
	const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
	const [fieldStructure, setFieldStructure] = useState<Record<string, { parent?: string; children: string[] }>>({});

	// Field groups based on common e-commerce data patterns
	const fieldGroups: Record<string, { name: string; fields: string[]; description: string }> = {
		basic: {
			name: "Basic Information",
			fields: ["id", "name", "description", "price", "sku"],
			description: "Essential product information",
		},
		media: {
			name: "Media & Assets",
			fields: ["images", "videos", "files"],
			description: "Product media and downloadable assets",
		},
		inventory: {
			name: "Inventory",
			fields: ["stock", "quantity", "inventory", "warehouse"],
			description: "Stock and inventory management",
		},
		variants: {
			name: "Variants & Options",
			fields: ["variants", "options", "attributes"],
			description: "Product variations and customizable options",
		},
		metadata: {
			name: "Metadata",
			fields: ["tags", "categories", "brand", "metadata"],
			description: "Additional product categorization and metadata",
		},
		custom: {
			name: "Custom Fields",
			fields: [],
			description: "Platform-specific custom fields",
		},
	};

	// Initialize field structure when component mounts or when extracted products change
	useEffect(() => {
		if (formData.extractedProducts?.[0]) {
			const newFieldStructure: Record<string, { parent?: string; children: string[] }> = {};

			// First pass: identify all fields
			for (const [fieldName, value] of Object.entries(formData.extractedProducts[0])) {
				newFieldStructure[fieldName] = { children: [] };
			}

			// Second pass: identify parent-child relationships
			for (const [fieldName, value] of Object.entries(formData.extractedProducts[0])) {
				if (typeof value === "object" && value !== null) {
					if (Array.isArray(value)) {
						// For arrays, we'll create child fields based on the first item if available
						if (value.length > 0 && typeof value[0] === "object") {
							// Create a special "All Items" option for the array
							const allItemsFieldName = `${fieldName}[all]`;
							newFieldStructure[allItemsFieldName] = { parent: fieldName, children: [] };
							newFieldStructure[fieldName].children.push(allItemsFieldName);

							// Create fields for the first item in the array
							for (const [childKey, childValue] of Object.entries(value[0])) {
								const childFieldName = `${fieldName}[0].${childKey}`;
								if (!newFieldStructure[childFieldName]) {
									newFieldStructure[childFieldName] = { parent: fieldName, children: [] };
								} else {
									newFieldStructure[childFieldName].parent = fieldName;
								}
								newFieldStructure[fieldName].children.push(childFieldName);

								// If the child is also an object, add its children
								if (typeof childValue === "object" && childValue !== null && !Array.isArray(childValue)) {
									for (const [grandChildKey] of Object.entries(childValue)) {
										const grandChildFieldName = `${fieldName}[0].${childKey}.${grandChildKey}`;
										newFieldStructure[grandChildFieldName] = {
											parent: childFieldName,
											children: [],
										};
										newFieldStructure[childFieldName].children.push(grandChildFieldName);
									}
								}
							}
						}
					} else {
						// For objects, create child fields
						for (const [childKey, childValue] of Object.entries(value)) {
							const childFieldName = `${fieldName}.${childKey}`;
							if (!newFieldStructure[childFieldName]) {
								newFieldStructure[childFieldName] = { parent: fieldName, children: [] };
							} else {
								newFieldStructure[childFieldName].parent = fieldName;
							}
							newFieldStructure[fieldName].children.push(childFieldName);

							// If the child is also an object, add its children
							if (typeof childValue === "object" && childValue !== null && !Array.isArray(childValue)) {
								for (const [grandChildKey] of Object.entries(childValue)) {
									const grandChildFieldName = `${fieldName}.${childKey}.${grandChildKey}`;
									newFieldStructure[grandChildFieldName] = {
										parent: childFieldName,
										children: [],
									};
									newFieldStructure[childFieldName].children.push(grandChildFieldName);
								}
							}
						}
					}
				}
			}

			setFieldStructure(newFieldStructure);
		}
	}, [formData.extractedProducts]);

	// Get field display name (for UI purposes)
	const getFieldDisplayName = (fieldName: string) => {
		// Handle array item fields
		if (fieldName.includes("[0].")) {
			const parts = fieldName.split("[0].");
			return `${parts[0]} > ${parts[1]}`;
		}

		// Handle "All Items" option for arrays
		if (fieldName.endsWith("[all]")) {
			return `${fieldName.replace("[all]", "")} (All Items)`;
		}

		// Handle nested object fields
		if (fieldName.includes(".")) {
			return fieldName.split(".").join(" > ");
		}

		return fieldName;
	};

	// Get field type and description
	const getFieldInfo = (fieldName: string, value: any) => {
		const type = typeof value;
		const isArray = Array.isArray(value);
		const isObject = type === "object" && value !== null && !isArray;

		let description = "";
		if (fieldName === "id") description = "Unique identifier for the product";
		else if (fieldName === "name") description = "Product name or title";
		else if (fieldName === "description") description = "Detailed product description";
		else if (fieldName === "price") description = "Product price in the store's currency";
		else if (fieldName === "images") description = "Array of product image URLs";
		else if (fieldName === "variants") description = "Product variations (e.g., size, color)";
		else if (fieldName === "categories") description = "Product categories or collections";
		else if (fieldName === "tags") description = "Product tags for filtering and search";
		else if (fieldName === "metadata") description = "Additional custom metadata";
		else if (fieldName.endsWith("[all]")) description = "Select all items in this array";
		else if (fieldName.includes("[0].")) description = "Fields from the first item in this array";

		return {
			type: isArray ? "array" : isObject ? "object" : type,
			description,
		};
	};

	// Filter fields based on search query and selected group
	const getFilteredFields = () => {
		if (!formData.extractedProducts?.[0]) return [];

		const fields = Object.entries(formData.extractedProducts[0]);
		return fields.filter(([fieldName, value]) => {
			const matchesSearch = fieldName.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesGroup =
				selectedGroup === "all" || fieldGroups[selectedGroup as keyof typeof fieldGroups].fields.includes(fieldName);
			return matchesSearch && matchesGroup;
		});
	};

	// Get checkbox state (checked, unchecked, or indeterminate)
	const getCheckboxState = (fieldName: string) => {
		const isSelected = formData.selectedFields[fieldName] || false;
		const children = fieldStructure[fieldName]?.children || [];

		if (children.length === 0) {
			return { checked: isSelected, indeterminate: false };
		}

		const selectedChildren = children.filter((child) => formData.selectedFields[child] || false);

		if (selectedChildren.length === 0) {
			return { checked: false, indeterminate: false };
		}

		if (selectedChildren.length === children.length) {
			return { checked: true, indeterminate: false };
		}

		return { checked: false, indeterminate: true };
	};

	// Handle field selection
	const handleFieldSelection = (fieldName: string, checked: boolean) => {
		const newSelectedFields = { ...formData.selectedFields };
		const children = fieldStructure[fieldName]?.children || [];

		// Update the selected field
		newSelectedFields[fieldName] = checked;

		// Update all children if this is a parent field
		if (children.length > 0) {
			for (const child of children) {
				newSelectedFields[child] = checked;
			}
		}

		// Update parent if this is a child field
		const parent = fieldStructure[fieldName]?.parent;
		if (parent) {
			const siblingChildren = fieldStructure[parent]?.children || [];
			const allSiblingsSelected = siblingChildren.every((sibling) => newSelectedFields[sibling] || false);
			const someSiblingsSelected = siblingChildren.some((sibling) => newSelectedFields[sibling] || false);

			if (allSiblingsSelected) {
				newSelectedFields[parent] = true;
			} else if (someSiblingsSelected) {
				// For indeterminate state, we don't set the parent field directly
				// Instead, we'll handle it in the UI with the indeterminate attribute
			} else {
				newSelectedFields[parent] = false;
			}
		}

		setFormData((prev) => ({
			...prev,
			selectedFields: newSelectedFields,
		}));
	};

	// Toggle field expansion
	const toggleFieldExpansion = (fieldName: string) => {
		setExpandedFields((prev) => ({
			...prev,
			[fieldName]: !prev[fieldName],
		}));
	};

	// Add this function to handle setting array identifier
	const handleSetArrayIdentifier = (arrayField: string, identifierField: string) => {
		setFormData((prev) => ({
			...prev,
			arrayIdentifiers: {
				...prev.arrayIdentifiers,
				[arrayField]: identifierField,
			},
		}));
	};

	// Add this function to check if a field is an array identifier
	const isArrayIdentifier = (arrayField: string, fieldName: string) => {
		return formData.arrayIdentifiers[arrayField] === fieldName;
	};

	// Add this function to handle setting product identifier
	const handleSetProductIdentifier = (fieldName: string) => {
		setFormData((prev) => ({
			...prev,
			productIdentifier: fieldName,
		}));
	};

	// Add this function to check if a field is the product identifier
	const isProductIdentifier = (fieldName: string) => {
		return formData.productIdentifier === fieldName;
	};

	// Modify the renderFieldItem function to include product identifier selection
	const renderFieldItem = (fieldName: string, value: any, isChild = false, parentArrayField?: string) => {
		const fieldInfo = getFieldInfo(fieldName, value);
		const isExpanded = expandedFields[fieldName] || false;
		const { checked, indeterminate } = getCheckboxState(fieldName);
		const hasChildren = (fieldStructure[fieldName]?.children || []).length > 0;
		const displayName = getFieldDisplayName(fieldName);
		const isArrayItemField = fieldName.includes("[0].");
		const arrayField = isArrayItemField ? fieldName.split("[0].")[0] : null;
		const isTopLevelField = !fieldName.includes(".") && !fieldName.includes("[");

		return (
			<div key={fieldName} className={`p-4 ${isChild ? "ml-6 border-l-2 border-gray-200" : ""}`}>
				<div className="flex items-start gap-4">
					<div className="relative mt-1">
						<input
							type="checkbox"
							id={fieldName}
							className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
							checked={checked}
							ref={(input) => {
								if (input && hasChildren) {
									input.indeterminate = indeterminate;
								}
							}}
							onChange={(e) => handleFieldSelection(fieldName, e.target.checked)}
						/>
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<label htmlFor={fieldName} className="font-medium">
								{displayName}
							</label>
							<div className="flex items-center gap-2">
								{isTopLevelField && (
									<button
										type="button"
										onClick={() => handleSetProductIdentifier(fieldName)}
										className={`text-xs px-2 py-1 rounded-full ${
											isProductIdentifier(fieldName)
												? "bg-primary text-white"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										{isProductIdentifier(fieldName) ? "Product ID" : "Set as Product ID"}
									</button>
								)}
								{isArrayItemField && arrayField && (
									<button
										type="button"
										onClick={() => handleSetArrayIdentifier(arrayField, fieldName)}
										className={`text-xs px-2 py-1 rounded-full ${
											isArrayIdentifier(arrayField, fieldName)
												? "bg-primary text-white"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										{isArrayIdentifier(arrayField, fieldName) ? "Identifier" : "Set as Identifier"}
									</button>
								)}
								<span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{fieldInfo.type}</span>
							</div>
						</div>
						{fieldInfo.description && <p className="text-sm text-gray-500 mt-1">{fieldInfo.description}</p>}
						{(fieldInfo.type === "object" || fieldInfo.type === "array") && (
							<button
								type="button"
								className="mt-2 text-sm text-primary hover:underline"
								onClick={() => toggleFieldExpansion(fieldName)}
							>
								{isExpanded ? "Hide details" : "Show details"}
							</button>
						)}
					</div>
				</div>

				{/* Expanded field details */}
				{isExpanded && (fieldInfo.type === "object" || fieldInfo.type === "array") && (
					<div className="mt-2 ml-8 pl-4 border-l-2 border-gray-200">
						{fieldInfo.type === "array" && Array.isArray(value) && value.length > 0 && typeof value[0] === "object" ? (
							<div className="space-y-2">
								<div className="text-sm text-gray-500">Array Item Fields:</div>
								{Object.entries(value[0]).map(([childKey, childValue]) => (
									<div key={childKey} className="ml-4">
										{renderFieldItem(`${fieldName}[0].${childKey}`, childValue, true, fieldName)}
									</div>
								))}
							</div>
						) : (
							<div className="relative group">
								<pre className="text-sm text-gray-600 overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
								<button
									onClick={() => {
										navigator.clipboard.writeText(JSON.stringify(value, null, 2));
										toast.success("Copied to clipboard");
									}}
									className="absolute top-1 right-1 p-1 rounded-md bg-white opacity-0 group-hover:opacity-100 transition-opacity"
									title="Copy to clipboard"
									type="button"
								>
									<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<title>Copy to clipboard icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			{/* Header section with platform info */}
			<div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
						<svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Fields mapping icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold">Fields Mapping</h3>
						<p className="text-sm text-gray-600">Select the fields you want to include in your chatbot</p>
					</div>
				</div>
				<div className="mt-4 text-sm text-gray-600">
					<p>This step allows you to:</p>
					<ul className="list-disc pl-5 mt-1 space-y-1">
						<li>Choose which product fields to include in your chatbot</li>
						<li>Set the product identifier field</li>
						<li>Configure array identifiers for nested data</li>
						<li>Preview field values and structure</li>
					</ul>
				</div>
			</div>

			{/* Search and filter controls */}
			<div className="bg-white border rounded-lg shadow-sm p-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1">
						<label htmlFor="field-search" className="block text-sm font-medium text-gray-700 mb-1">
							Search Fields
						</label>
						<div className="relative rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<title>Search icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<input
								id="field-search"
								type="text"
								placeholder="Search for fields..."
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex-1">
						<label htmlFor="field-group" className="block text-sm font-medium text-gray-700 mb-1">
							Filter by Group
						</label>
						<select
							id="field-group"
							className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
							value={selectedGroup}
							onChange={(e) => setSelectedGroup(e.target.value)}
						>
							<option value="all">All Fields</option>
							{Object.entries(fieldGroups).map(([key, group]) => (
								<option key={key} value={key}>
									{group.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Field selection summary */}
			<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
				<div className="px-6 py-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
					<div>
						<h4 className="font-medium text-gray-900">Available Fields</h4>
						<p className="text-sm text-gray-500">Select fields to include in your chatbot</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
							{Object.keys(formData.selectedFields).filter((key) => formData.selectedFields[key]).length} Selected
						</span>
						<span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
							{Object.keys(formData.selectedFields).length} Total
						</span>
					</div>
				</div>

				{/* Fields list */}
				<div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
					{getFilteredFields().length > 0 ? (
						getFilteredFields().map(([fieldName, value]) => renderFieldItem(fieldName, value))
					) : (
						<div className="p-8 text-center">
							<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<title>No results icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<h3 className="mt-2 text-sm font-medium text-gray-900">No fields found</h3>
							<p className="mt-1 text-sm text-gray-500">
								Try adjusting your search or filter to find what you're looking for.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Validation summary */}
			<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
				<div className="px-6 py-4 border-b bg-gray-50">
					<h4 className="font-medium text-gray-900">Field Selection Summary</h4>
				</div>
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="text-sm text-gray-500 mb-1">Selected Fields</div>
							<div className="text-2xl font-semibold text-primary">
								{Object.values(formData.selectedFields).filter(Boolean).length}
							</div>
							<div className="text-xs text-gray-500 mt-1">
								of {Object.keys(formData.selectedFields).length} total fields
							</div>
						</div>
						{/* <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Required Fields</div>
              <div className="text-2xl font-semibold text-green-600">All present</div>
              <div className="text-xs text-gray-500 mt-1">
                id, name, price, description
              </div>
            </div> */}
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="text-sm text-gray-500 mb-1">Product Identifier</div>
							<div className="text-2xl font-semibold text-primary">{formData.productIdentifier || "Not set"}</div>
							<div className="text-xs text-gray-500 mt-1">Used to uniquely identify products</div>
						</div>
					</div>

					<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<title>Information icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-blue-800">Field Selection Tips</h3>
								<div className="mt-2 text-sm text-blue-700">
									<ul className="list-disc pl-5 space-y-1">
										<li>Select fields that contain information customers frequently ask about</li>
										<li>Include fields with rich, descriptive content for better search results</li>
										<li>For arrays, you can select individual fields or the entire array</li>
										<li>Set a product identifier field to enable direct product references</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DataEmbeddingStep({ formData, setFormData, isLoading, setIsLoading, setIsValidated }: StepProps) {
	const [embeddingStatus, setEmbeddingStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
	const [progress, setProgress] = useState(0);
	const [currentStep, setCurrentStep] = useState("");
	const [qualityMetrics, setQualityMetrics] = useState<{
		accuracy: number;
		relevance: number;
		coverage: number;
	} | null>(null);
	const [sampleQueries, setSampleQueries] = useState<{ id: string; query: string }[]>([]);

	const handleGenerateSDK = async () => {
		try {
			setIsLoading(true);
			setEmbeddingStatus("processing");
			setProgress(0);
			setCurrentStep("Validating data...");

			// Simulate progress updates
			const progressInterval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) {
						clearInterval(progressInterval);
						return 90;
					}
					return prev + 10;
				});

				// Update current step based on progress
				if (progress < 30) {
					setCurrentStep("Validating data...");
				} else if (progress < 60) {
					setCurrentStep("Generating embeddings...");
				} else {
					setCurrentStep("Optimizing for search...");
				}
			}, 1000);

			// Update fields
			await sdkWizardService.updateData({ fields: formData.fields });

			clearInterval(progressInterval);
			setProgress(100);
			setCurrentStep("Completed");

			// Simulate quality metrics
			setQualityMetrics({
				accuracy: 0.95,
				relevance: 0.92,
				coverage: 0.88,
			});

			// Generate sample queries based on the data
			setSampleQueries([
				{
					id: "best-selling",
					query: "What are the best-selling products?",
				},
				{
					id: "under-50",
					query: "Show me products under $50",
				},
				{
					id: "electronics",
					query: "Find products in the Electronics category",
				},
				{
					id: "newest",
					query: "What are the newest arrivals?",
				},
				{
					id: "free-shipping",
					query: "Show me products with free shipping",
				},
			]);

			setEmbeddingStatus("success");
			toast.success("SDK generated successfully");
		} catch (error) {
			console.error("Error generating SDK:", error);
			setEmbeddingStatus("error");
			toast.error("Failed to generate SDK. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Header section with platform info */}
			<div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
						<svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Data embedding icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold">Data Embedding & SDK Generation</h3>
						<p className="text-sm text-gray-600">Process your data and generate SDK credentials</p>
					</div>
				</div>
				<div className="mt-4 text-sm text-gray-600">
					<p>This step will:</p>
					<ul className="list-disc pl-5 mt-1 space-y-1">
						<li>Process and validate your selected fields</li>
						<li>Generate vector embeddings for semantic search</li>
						<li>Optimize the data for chatbot performance</li>
						<li>Create SDK credentials for integration</li>
					</ul>
				</div>
			</div>

			{/* Initial state - Start embedding button */}
			{embeddingStatus === "idle" && (
				<div className="bg-white border rounded-lg shadow-sm p-8 text-center">
					<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-10 h-10 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Start embedding icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<h4 className="text-xl font-medium mb-2">Ready to Process Your Data</h4>
					<p className="text-gray-500 mb-6 max-w-md mx-auto">
						Click the button below to start processing your selected fields and generate SDK credentials. This process
						may take a few minutes depending on the amount of data.
					</p>
					<Button onClick={handleGenerateSDK} disabled={isLoading} className="px-6 py-2 min-w-[200px]">
						Start Data Processing
					</Button>
				</div>
			)}

			{/* Processing state */}
			{embeddingStatus === "processing" && (
				<div className="bg-white border rounded-lg shadow-sm p-6">
					<div className="flex items-center mb-4">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
							<svg
								className="w-5 h-5 text-primary animate-pulse"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Processing icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						</div>
						<div>
							<h4 className="text-lg font-medium">Processing Your Data</h4>
							<p className="text-sm text-gray-500">Please wait while we process your data</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">
								<div>
									<span className="text-sm font-medium text-primary">{currentStep}</span>
								</div>
								<div className="text-right">
									<span className="text-sm font-medium text-primary">{progress}%</span>
								</div>
							</div>
							<div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-primary/10">
								<div
									style={{ width: `${progress}%` }}
									className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Status</div>
								<div className="font-medium">Processing</div>
							</div>
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Current Step</div>
								<div className="font-medium">{currentStep}</div>
							</div>
							<div className="bg-gray-50 p-4 rounded-md">
								<div className="text-xs text-gray-500 mb-1">Connection</div>
								<div className="font-medium text-green-600">Connected</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Success state */}
			{embeddingStatus === "success" && (
				<div className="space-y-6">
					<div className="bg-green-50 border border-green-200 rounded-lg p-5">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<svg
									className="h-6 w-6 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<title>Success icon</title>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-lg font-medium text-green-800">Data processing completed successfully</h3>
								<div className="mt-2 text-sm text-green-700">
									<p>
										Your data has been processed and SDK credentials have been generated. You can now integrate the
										chatbot with your application.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quality Metrics */}
					<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b bg-gray-50">
							<h4 className="font-medium text-gray-900">Embedding Quality Metrics</h4>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{qualityMetrics && (
									<>
										<div className="bg-gray-50 p-4 rounded-lg">
											<div className="text-sm text-gray-500 mb-1">Accuracy</div>
											<div className="text-2xl font-semibold text-primary">
												{(qualityMetrics.accuracy * 100).toFixed(1)}%
											</div>
											<div className="text-xs text-gray-500 mt-1">How well the embeddings capture product meaning</div>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<div className="text-sm text-gray-500 mb-1">Relevance</div>
											<div className="text-2xl font-semibold text-primary">
												{(qualityMetrics.relevance * 100).toFixed(1)}%
											</div>
											<div className="text-xs text-gray-500 mt-1">How well results match user queries</div>
										</div>
										<div className="bg-gray-50 p-4 rounded-lg">
											<div className="text-sm text-gray-500 mb-1">Coverage</div>
											<div className="text-2xl font-semibold text-primary">
												{(qualityMetrics.coverage * 100).toFixed(1)}%
											</div>
											<div className="text-xs text-gray-500 mt-1">How much of your product data is searchable</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					{/* Sample Queries */}
					<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b bg-gray-50">
							<h4 className="font-medium text-gray-900">Sample Queries</h4>
							<p className="text-sm text-gray-500 mt-1">Examples of queries your chatbot can handle</p>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{sampleQueries.map((query) => (
									<div
										key={query.id}
										className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors"
									>
										<div className="flex items-start">
											<div className="flex-shrink-0 mt-1">
												<svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<title>Query icon</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
													/>
												</svg>
											</div>
											<div className="ml-3">
												<p className="text-sm text-gray-700">{query.query}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* SDK Credentials */}
					<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
						<div className="px-6 py-4 border-b bg-gray-50">
							<h4 className="font-medium text-gray-900">SDK Credentials</h4>
							<p className="text-sm text-gray-500 mt-1">
								Use these credentials to integrate the chatbot with your application
							</p>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								<div>
									<label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
										API Key
									</label>
									<div className="flex">
										<input
											id="api-key"
											type="text"
											className="block w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary sm:text-sm"
											value="sk_1234567890abcdef"
											readOnly
										/>
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
											onClick={() => {
												navigator.clipboard.writeText("sk_1234567890abcdef");
												toast.success("API key copied to clipboard");
											}}
										>
											<svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<title>Copy icon</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
												/>
											</svg>
											Copy
										</button>
									</div>
								</div>
								<div>
									<label htmlFor="project-id" className="block text-sm font-medium text-gray-700 mb-1">
										Project ID
									</label>
									<div className="flex">
										<input
											id="project-id"
											type="text"
											className="block w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary sm:text-sm"
											value="proj_1234567890"
											readOnly
										/>
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
											onClick={() => {
												navigator.clipboard.writeText("proj_1234567890");
												toast.success("Project ID copied to clipboard");
											}}
										>
											<svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<title>Copy icon</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
												/>
											</svg>
											Copy
										</button>
									</div>
								</div>
							</div>

							<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Information icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-blue-800">Integration Tips</h3>
										<div className="mt-2 text-sm text-blue-700">
											<ul className="list-disc pl-5 space-y-1">
												<li>Keep your API key secure and never expose it in client-side code</li>
												<li>Use environment variables to store your credentials</li>
												<li>
													Check our{" "}
													<a href="/docs/integration" className="underline">
														documentation
													</a>{" "}
													for integration examples
												</li>
												<li>Contact support if you need help with the integration</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Error state */}
			{embeddingStatus === "error" && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-5">
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<svg
								className="h-6 w-6 text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Error icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-lg font-medium text-red-800">Error processing data</h3>
							<div className="mt-2 text-sm text-red-700">
								<p>
									There was an error processing your data. Please try again or contact support if the issue persists.
								</p>
								<div className="mt-4">
									<Button
										variant="outline"
										onClick={handleGenerateSDK}
										disabled={isLoading}
										className="bg-white text-red-700 border-red-300 hover:bg-red-50"
									>
										Retry Processing
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function CompletionStep({ formData }: { formData: FormData }) {
	const navigate = useNavigate();

	const handleComplete = async () => {
		try {
			// Mark the SDK wizard as complete
			await sdkWizardService.completeWizard();
			toast.success("Setup completed successfully");

			// Navigate to dashboard
			navigate("/dashboard");
		} catch (error) {
			console.error("Error completing setup:", error);
			toast.error("Failed to complete setup. Please try again.");
		}
	};

	return (
		<div className="space-y-6">
			{/* Header section with platform info */}
			<div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
						<svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Completion icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold">Setup Complete!</h3>
						<p className="text-sm text-gray-600">
							Your chatbot is ready for integration with your {formData.platform} store
						</p>
					</div>
				</div>
				<div className="mt-4 text-sm text-gray-600">
					<p>
						Congratulations! You've successfully completed the SDK setup process. Your chatbot is now ready to be
						integrated with your application.
					</p>
				</div>
			</div>

			{/* Success message */}
			<div className="bg-green-50 border border-green-200 rounded-lg p-6">
				<div className="flex items-start">
					<div className="flex-shrink-0">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
							<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<title>Success checkmark</title>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<div className="ml-4">
						<h3 className="text-lg font-medium text-green-800">Setup Completed Successfully</h3>
						<div className="mt-2 text-sm text-green-700">
							<p>Your chatbot has been configured with the following:</p>
							<ul className="list-disc pl-5 mt-2 space-y-1">
								<li>Connected to your {formData.platform} store</li>
								<li>
									Processed {Object.keys(formData.selectedFields).filter((key) => formData.selectedFields[key]).length}{" "}
									selected fields
								</li>
								<li>Generated SDK credentials for integration</li>
								<li>Optimized for semantic search and chatbot performance</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Next steps */}
			<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
				<div className="px-6 py-4 border-b bg-gray-50">
					<h4 className="font-medium text-gray-900">Next Steps</h4>
					<p className="text-sm text-gray-500 mt-1">Follow these steps to integrate your chatbot</p>
				</div>
				<div className="p-6">
					<div className="space-y-4">
						<div className="flex items-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-0.5">
								<span className="text-sm font-medium">1</span>
							</div>
							<div>
								<h5 className="font-medium text-gray-900">Download the SDK Package</h5>
								<p className="text-sm text-gray-500 mt-1">
									Download the SDK package that contains all the necessary components for integration.
								</p>
								<div className="mt-3">
									<button
										type="button"
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Download icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
											/>
										</svg>
										Download SDK
									</button>
								</div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-0.5">
								<span className="text-sm font-medium">2</span>
							</div>
							<div>
								<h5 className="font-medium text-gray-900">Follow the Integration Guide</h5>
								<p className="text-sm text-gray-500 mt-1">
									Follow our step-by-step integration guide to add the chatbot to your application.
								</p>
								<div className="mt-3">
									<a
										href="/docs/integration"
										className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Documentation icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											/>
										</svg>
										View Integration Guide
									</a>
								</div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-0.5">
								<span className="text-sm font-medium">3</span>
							</div>
							<div>
								<h5 className="font-medium text-gray-900">Test in Development</h5>
								<p className="text-sm text-gray-500 mt-1">
									Test the chatbot in your development environment before deploying to production.
								</p>
								<div className="mt-3">
									<a
										href="/dashboard/test"
										className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Test icon</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
											/>
										</svg>
										Go to Test Environment
									</a>
								</div>
							</div>
						</div>

						<div className="flex items-start">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-0.5">
								<span className="text-sm font-medium">4</span>
							</div>
							<div>
								<h5 className="font-medium text-gray-900">Deploy to Production</h5>
								<p className="text-sm text-gray-500 mt-1">
									Deploy the chatbot to your production environment and start providing customer support.
								</p>
								<div className="mt-3">
									<a
										href="/dashboard/deploy"
										className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<title>Deploy icon</title>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
										</svg>
										Deploy to Production
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Support section */}
			<div className="bg-white border rounded-lg shadow-sm overflow-hidden">
				<div className="px-6 py-4 border-b bg-gray-50">
					<h4 className="font-medium text-gray-900">Need Help?</h4>
					<p className="text-sm text-gray-500 mt-1">Our support team is here to help you with any questions</p>
				</div>
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<title>Documentation icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<h5 className="font-medium text-gray-900">Documentation</h5>
									<p className="text-sm text-gray-500 mt-1">
										Browse our comprehensive documentation for detailed guides and API references.
									</p>
									<div className="mt-3">
										<a href="/docs" className="text-sm font-medium text-primary hover:text-primary/80">
											View Documentation →
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<title>Support icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<h5 className="font-medium text-gray-900">Contact Support</h5>
									<p className="text-sm text-gray-500 mt-1">
										Get in touch with our support team for personalized assistance.
									</p>
									<div className="mt-3">
										<a href="/support" className="text-sm font-medium text-primary hover:text-primary/80">
											Contact Support →
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Complete button */}
			<div className="flex justify-center">
				<Button onClick={handleComplete} className="px-6 py-2 min-w-[200px]">
					Complete Setup
					<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<title>Complete icon</title>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
					</svg>
				</Button>
			</div>
		</div>
	);
}

// Helper function to check if a field is an array
const isArrayField = (value: any): boolean => {
	return Array.isArray(value);
};

// Helper function to check if a field is an object
const isObjectField = (value: any): boolean => {
	return typeof value === "object" && value !== null && !Array.isArray(value);
};

// Helper function to format field values for display
const formatFieldValue = (value: any): string => {
	if (value === null || value === undefined) return "";
	if (typeof value === "object") {
		return JSON.stringify(value);
	}
	return String(value);
};

// Helper function to handle field selection changes
const handleFieldSelectionChange = (
	setFormData: React.Dispatch<React.SetStateAction<FormData>>,
	fieldName: string,
	checked: boolean,
) => {
	setFormData((prev: FormData) => ({
		...prev,
		selectedFields: {
			...prev.selectedFields,
			[fieldName]: checked,
		},
	}));
};
