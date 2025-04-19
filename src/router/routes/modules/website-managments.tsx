import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const WebsiteManagementIndex = lazy(() => import("@/pages/website_management/index"));
const WebsiteSetup = lazy(() => import("@/pages/website_management/setup"));
const LLMManagement = lazy(() => import("@/pages/website_management/llm"));
const ExportManagement = lazy(() => import("@/pages/website_management/export"));

// const OrganizationPage = lazy(() => import("@/pages/website_management/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/website_management/system/permission"));

// const Blog = lazy(() => import("@/pages/website_management/blog"));

const website_management: AppRouteObject = {
	order: 2,
	path: "website_management",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.website_management.index",
		icon: <Iconify icon="icon-park-outline:browser-safari" className="ant-menu-item-icon" size="24" />,
		key: "/website_management",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <WebsiteManagementIndex />,
			meta: { label: "sys.menu.website_management.user", key: "/website_management/index" },
		},
		{
			path: "setup",
			element: <WebsiteSetup />,
			meta: { label: "sys.menu.website_management.setup", key: "/website_management/setup" },
		},
		{
			path: "llm",
			element: <LLMManagement />,
			meta: { label: "sys.menu.website_management.llm", key: "/website_management/llm" },
		},
		{
			path: "export",
			element: <ExportManagement />,
			meta: { label: "sys.menu.website_management.export", key: "/website_management/export" },
		},
	],
	// children: [
	// 	{
	// 		index: true,
	// 		element: <Navigate to="user" replace />,
	// 	},
	// 	{
	// 		path: "user",
	// 		meta: { label: "sys.menu.user.index", key: "/analysis/user" },
	// 		children: [
	// 			{
	// 				index: true,
	// 				element: <Navigate to="profile" replace />,
	// 			},
	// 			{
	// 				path: "profile",
	// 				element: <ProfilePage />,
	// 				meta: {
	// 					label: "sys.menu.user.profile",
	// 					key: "/analysis/user/profile",
	// 				},
	// 			},
	// 			{
	// 				path: "account",
	// 				element: <AccountPage />,
	// 				meta: {
	// 					label: "sys.menu.user.account",
	// 					key: "/analysis/user/account",
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		path: "system",
	// 		meta: { label: "sys.menu.system.index", key: "/analysis/system" },
	// 		children: [
	// 			{
	// 				path: "organization",
	// 				element: <OrganizationPage />,
	// 				meta: {
	// 					label: "sys.menu.system.organization",
	// 					key: "/analysis/system/organization",
	// 				},
	// 			},
	// 			{
	// 				path: "permission",
	// 				element: <PermissioPage />,
	// 				meta: {
	// 					label: "sys.menu.system.permission",
	// 					key: "/analysis/system/permission",
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		path: "blog",
	// 		element: <Blog />,
	// 		meta: { label: "sys.menu.blog", key: "/analysis/blog" },
	// 	},
	// ],
};

export default website_management;
