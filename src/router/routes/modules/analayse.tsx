import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

// Lazy-loaded components
const AnalysisComponents = {
	ProductEngagementTrends: lazy(() => import("@/pages/analysis/components/ProductEngagementTrends")),
	SalesPerformance: lazy(() => import("@/pages/analysis/components/SalesPerformance")),
	IntentQueryTrends: lazy(() => import("@/pages/analysis/components/IntentQueryTrends")),
	UserSegmentation: lazy(() => import("@/pages/analysis/components/UserSegmentation")),
	SystemPerformance: lazy(() => import("@/pages/analysis/components/SystemPerformance")),
	MostMentionedProducts: lazy(() => import("@/pages/analysis/components/MostMentionedProducts")),
};

// Layout component for analysis section
const AnalysisLayout = () => (
	<Suspense fallback={<CircleLoading />}>
		<Outlet />
	</Suspense>
);

// Route configuration
const analysisRoutes = [
	{
		path: "product",
		element: <AnalysisComponents.ProductEngagementTrends />,
		meta: { label: "sys.menu.analysis.product", key: "/analysis/product" },
	},
	{
		path: "sales",
		element: <AnalysisComponents.SalesPerformance />,
		meta: { label: "sys.menu.analysis.sales", key: "/analysis/sales" },
	},
	{
		path: "intent",
		element: <AnalysisComponents.IntentQueryTrends />,
		meta: { label: "sys.menu.analysis.intent", key: "/analysis/intent" },
	},
	{
		path: "user_segmentation",
		element: <AnalysisComponents.UserSegmentation />,
		meta: { label: "sys.menu.analysis.user_segmentation", key: "/analysis/user_segmentation" },
	},
	{
		path: "system",
		element: <AnalysisComponents.SystemPerformance />,
		meta: { label: "sys.menu.analysis.system", key: "/analysis/system" },
	},
	{
		path: "mentions",
		element: <AnalysisComponents.MostMentionedProducts />,
		meta: { label: "sys.menu.analysis.mentions", key: "/analysis/mentions" },
	},
];

// Main analysis route configuration
const analysis: AppRouteObject = {
	order: 2,
	path: "analysis",
	element: <AnalysisLayout />,
	meta: {
		label: "sys.menu.analysis.index",
		icon: <Iconify icon="icon-park-outline:market-analysis" className="ant-menu-item-icon" size="24" />,
		key: "/analysis",
	},
	children: [
		{
			index: true,
			element: <Navigate to="product" replace />,
		},
		...analysisRoutes,
	],
};

export default analysis;
