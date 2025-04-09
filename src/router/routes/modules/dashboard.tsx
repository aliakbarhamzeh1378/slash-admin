import { Suspense, lazy } from "react";
// import { Navigate, Outlet } from "react-router";
import { SvgIcon } from "@/components/icon";

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
		// icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
		icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,

		key: "/dashboard",
	},
};

export default dashboard;
