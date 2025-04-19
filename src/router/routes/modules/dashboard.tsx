// import { Navigate, Outlet } from "react-router";
import { Iconify } from "@/components/icon";
import { Suspense, lazy } from "react";

import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

const HomePage = lazy(() => import("@/pages/dashboard/workbench"));
// const Analysis = lazy(() => import("@/pages/dashboard/analysis"));
function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

const dashboard: AppRouteObject = {
	order: 1,
	path: "dashboard",
	element: (
		<Wrapper>
			<HomePage />
		</Wrapper>
	),
	meta: {
		label: "sys.menu.dashboard",
		// icon: <Iconify icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
		icon: <Iconify icon="icon-park-outline:dashboard-two" className="ant-menu-item-icon" size="24" />,

		key: "/dashboard",
	},
};

export default dashboard;
