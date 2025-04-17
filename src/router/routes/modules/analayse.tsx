import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ProductEngagementTrends = lazy(() => import("@/pages/analysis/components/ProductEngagementTrends"));
const SalesPerformance = lazy(() => import("@/pages/analysis/components/SalesPerformance"));
const IntentQueryTrends = lazy(() => import("@/pages/analysis/components/IntentQueryTrends"));
const UserSegmentation = lazy(() => import("@/pages/analysis/components/UserSegmentation"));
const SystemPerformance = lazy(() => import("@/pages/analysis/components/SystemPerformance"));
const MostMentionedProducts = lazy(() => import("@/pages/analysis/components/MostMentionedProducts"));

const analysis: AppRouteObject = {
	order: 2,
	path: "analysis",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.analysis.index",
		icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
		key: "/analysis",
	},
	children: [
		{
			index: true,
			element: <Navigate to="product" replace />,
		},
		{
			path: "product",
			element: <ProductEngagementTrends />,
			meta: { label: "sys.menu.analysis.product", key: "/analysis/product" },
		},
		{
			path: "sales",
			element: <SalesPerformance />,
			meta: { label: "sys.menu.analysis.sales", key: "/analysis/sales" },
		},
		{
			path: "intent",
			element: <IntentQueryTrends />,
			meta: { label: "sys.menu.analysis.intent", key: "/analysis/intent" },
		},
		{
			path: "user_segmentation",
			element: <UserSegmentation />,
			meta: { label: "sys.menu.analysis.user_segmentation", key: "/analysis/user_segmentation" },
		},
		{
			path: "system",
			element: <SystemPerformance />,
			meta: { label: "sys.menu.analysis.system", key: "/analysis/system" },
		},
		{
			path: "mentions",
			element: <MostMentionedProducts />,
			meta: { label: "sys.menu.analysis.mentions", key: "/analysis/mentions" },
		},
	],
};

export default analysis;
