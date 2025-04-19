import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const BillingPlansIndex = lazy(() => import("@/pages/billing_plans/user/index"));
const UpgradePlans = lazy(() => import("@/pages/billing_plans/user/upgrade"));
const BillingHistory = lazy(() => import("@/pages/billing_plans/user/history"));

// const OrganizationPage = lazy(() => import("@/pages/billing_plans/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/billing_plans/system/permission"));

// const Blog = lazy(() => import("@/pages/billing_plans/blog"));

const billing_plans: AppRouteObject = {
	order: 2,
	path: "billing_plans",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.billing_plans.index",
		icon: <Iconify icon="icon-park-outline:paper-money-two" className="ant-menu-item-icon" size="24" />,
		key: "billinge_management",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <BillingPlansIndex />,
			meta: { label: "sys.menu.billing_plans.index", key: "/billing_plans/index" },
		},
		{
			path: "upgrade",
			element: <UpgradePlans />,
			meta: { label: "sys.menu.billing_plans.upgrade", key: "/billing_plans/upgrade" },
		},
		{
			path: "history",
			element: <BillingHistory />,
			meta: { label: "sys.menu.billing_plans.history", key: "/billing_plans/history" },
		},
	]
};

export default billing_plans;
