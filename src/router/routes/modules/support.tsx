import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const ProfilePage = lazy(() => import("@/pages/support/user/profile"));
// const AccountPage = lazy(() => import("@/pages/support/user/account"));

// const OrganizationPage = lazy(() => import("@/pages/support/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/support/system/permission"));

// const Blog = lazy(() => import("@/pages/support/blog"));

const support: AppRouteObject = {
	order: 2,
	path: "support",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.support",
		icon: <SvgIcon icon="ic-user" className="ant-menu-item-icon" size="24" />,
		key: "/support",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <ProfilePage />,
			meta: { label: "sys.menu.support.index", key: "/support/index" },
		},
		{
			path: "setup",
			element: <ProfilePage />,
			meta: { label: "sys.menu.support.faq", key: "/support/faq/" },
		},
		{
			path: "setup",
			element: <ProfilePage />,
			meta: { label: "sys.menu.support.guide", key: "/support/guide/" },
		},
		{
			path: "setup",
			element: <ProfilePage />,
			meta: { label: "sys.menu.support.contact", key: "/support/contact/" },
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

export default support;
