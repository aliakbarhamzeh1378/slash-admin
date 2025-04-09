import { Suspense } from "react";
import { Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

// const ProfilePage = lazy(() => import("@/pages/analysis/user/profile"));
// const AccountPage = lazy(() => import("@/pages/analysis/user/account"));

// const OrganizationPage = lazy(() => import("@/pages/analysis/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/analysis/system/permission"));

// const Blog = lazy(() => import("@/pages/analysis/blog"));

const analysis: AppRouteObject = {
	order: 2,
	path: "analysis",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "sys.menu.analysis",
		icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
		key: "/analysis",
	},
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

export default analysis;
