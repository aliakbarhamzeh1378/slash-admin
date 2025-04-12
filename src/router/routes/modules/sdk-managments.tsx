import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ProfilePage = lazy(() => import("@/pages/sdk_management/user/profile"));
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
		icon: <SvgIcon icon="ic-user" className="ant-menu-item-icon" size="24" />,
		key: "/sdk_management",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <ProfilePage />,
			meta: { label: "sys.menu.sdk_management.index", key: "/sdk_management/index" },
		},
		{
			path: "setup",
			element: <ProfilePage />,
			meta: { label: "sys.menu.sdk_management.setup", key: "/sdk_management/setup" },
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

export default sdk_management;
