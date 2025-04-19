import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify, SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const SetupPage = lazy(() => import("@/pages/sdk_management/setup"));
const IndexPage = lazy(() => import("@/pages/sdk_management/index"));
// const AccountPage = lazy(() => import("@/pages/sdk_management/user/account"));

// const OrganizationPage = lazy(() => import("@/pages/sdk_management/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/sdk_management/system/permission"));

// const Blog = lazy(() => import("@/pages/sdk_management/blog"));

const sdk_management: AppRouteObject = {
	order: 2,
	path: "sdk_management",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.sdk_management.index",
		icon: <Iconify icon="icon-park-outline:code" size={24} />,
		key: "/sdk_management",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <IndexPage />,
			meta: { label: "sys.menu.sdk_management.index", key: "/sdk_management/index" },
		},
		{
			path: "setup",
			element: <SetupPage />,
			meta: { label: "sys.menu.sdk_management.setup", key: "/sdk_management/setup" },
		},
	]
};

export default sdk_management;
