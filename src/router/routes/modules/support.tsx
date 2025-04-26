import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import GuideAccessControl from "@/pages/support/guide/articles/access-control";
import GuideAccountSetup from "@/pages/support/guide/articles/account-setup";
import GuideApi from "@/pages/support/guide/articles/api";
import GuideDashboard from "@/pages/support/guide/articles/dashboard";
import GuideFirstProject from "@/pages/support/guide/articles/first-project";
import GuideIntegrations from "@/pages/support/guide/articles/integrations";
import GuideInvitingUsers from "@/pages/support/guide/articles/inviting-users";
import GuideOverview from "@/pages/support/guide/articles/overview";
import GuideProjectManagement from "@/pages/support/guide/articles/project-management";
import GuideReports from "@/pages/support/guide/articles/reports";
import GuideTeamRoles from "@/pages/support/guide/articles/team-roles";
import GuideWebhooks from "@/pages/support/guide/articles/webhooks";
import type { AppRouteObject } from "#/router";

const SupportIndex = lazy(() => import("@/pages/support/index"));
const FAQ = lazy(() => import("@/pages/support/faq"));
const UserGuide = lazy(() => import("@/pages/support/guide"));
const ContactSupport = lazy(() => import("@/pages/support/contact"));
const TicketView = lazy(() => import("@/pages/support/tickets/view"));

// Guide article components

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
		label: "sys.menu.support.index",
		icon: <Iconify icon="mdi:headset" className="ant-menu-item-icon" size="24" />,
		key: "support",
	},

	children: [
		{
			index: true,
			element: <Navigate to="index" replace />,
		},
		{
			path: "index",
			element: <SupportIndex />,
			meta: {
				label: "sys.menu.support.index",
				key: "/support/index",
				icon: <Iconify icon="mdi:view-dashboard" className="ant-menu-item-icon" size="20" />,
			},
		},
		{
			path: "faq",
			element: <FAQ />,
			meta: {
				label: "sys.menu.support.faq",
				key: "/support/faq",
				icon: <Iconify icon="mdi:frequently-asked-questions" className="ant-menu-item-icon" size="20" />,
			},
		},
		{
			path: "guide",
			element: <UserGuide />,
			meta: {
				label: "sys.menu.support.guide",
				key: "/support/guide",
				icon: <Iconify icon="mdi:book-open-page-variant" className="ant-menu-item-icon" size="20" />,
			},
		},
		{
			path: "contact",
			element: <ContactSupport />,
			meta: {
				label: "sys.menu.support.contact",
				key: "/support/contact",
				icon: <Iconify icon="mdi:email" className="ant-menu-item-icon" size="20" />,
			},
		},
		{
			path: "tickets/:id",
			element: <TicketView />,
			meta: {
				label: "Ticket Details",
				key: "/support/tickets/:id",
				hideMenu: true,
			},
		},
		// Guide article routes
		{
			path: "guide/overview",
			element: <GuideOverview />,
			meta: {
				label: "Platform Overview",
				key: "/support/guide/overview",
				hideMenu: true,
			},
		},
		{
			path: "guide/account-setup",
			element: <GuideAccountSetup />,
			meta: {
				label: "Account Setup",
				key: "/support/guide/account-setup",
				hideMenu: true,
			},
		},
		{
			path: "guide/first-project",
			element: <GuideFirstProject />,
			meta: {
				label: "First Project",
				key: "/support/guide/first-project",
				hideMenu: true,
			},
		},
		{
			path: "guide/team-roles",
			element: <GuideTeamRoles />,
			meta: {
				label: "Team Roles",
				key: "/support/guide/team-roles",
				hideMenu: true,
			},
		},
		{
			path: "guide/inviting-users",
			element: <GuideInvitingUsers />,
			meta: {
				label: "Inviting Users",
				key: "/support/guide/inviting-users",
				hideMenu: true,
			},
		},
		{
			path: "guide/access-control",
			element: <GuideAccessControl />,
			meta: {
				label: "Access Control",
				key: "/support/guide/access-control",
				hideMenu: true,
			},
		},
		{
			path: "guide/dashboard",
			element: <GuideDashboard />,
			meta: {
				label: "Dashboard Overview",
				key: "/support/guide/dashboard",
				hideMenu: true,
			},
		},
		{
			path: "guide/project-management",
			element: <GuideProjectManagement />,
			meta: {
				label: "Project Management",
				key: "/support/guide/project-management",
				hideMenu: true,
			},
		},
		{
			path: "guide/reports",
			element: <GuideReports />,
			meta: {
				label: "Reports & Analytics",
				key: "/support/guide/reports",
				hideMenu: true,
			},
		},
		{
			path: "guide/api",
			element: <GuideApi />,
			meta: {
				label: "API Documentation",
				key: "/support/guide/api",
				hideMenu: true,
			},
		},
		{
			path: "guide/integrations",
			element: <GuideIntegrations />,
			meta: {
				label: "Third-party Tools",
				key: "/support/guide/integrations",
				hideMenu: true,
			},
		},
		{
			path: "guide/webhooks",
			element: <GuideWebhooks />,
			meta: {
				label: "Webhooks",
				key: "/support/guide/webhooks",
				hideMenu: true,
			},
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
