import { Suspense } from "react";
import { Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import UserManagementPage from "@/pages/user_management";

import type { AppRouteObject } from "#/router";

// const AccountPage = lazy(() => import("@/pages/user_management/user/account"));

// const OrganizationPage = lazy(() => import("@/pages/user_management/system/organization"));
// const PermissioPage = lazy(() => import("@/pages/user_management/system/permission"));

// const Blog = lazy(() => import("@/pages/user_management/blog"));

const user_management: AppRouteObject = {
	order: 2,
	path: "user_management",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<UserManagementPage />
		</Suspense>
	),
	meta: {
		label: "sys.menu.user_management.index",
		icon: <Iconify icon="icon-park-outline:every-user" className="ant-menu-item-icon" size="24" />,
		key: "/user_management",
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

export default user_management;
