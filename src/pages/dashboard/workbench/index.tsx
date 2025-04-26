import { Col, Row, Typography } from "antd";
import { Card } from "antd";
import { useEffect, useState } from "react";

import dashboardService, { type DashboardStats } from "@/api/services/dashboardService";
import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import glass_buy from "@/assets/images/glass/ic_glass_buy.png";
import glass_message from "@/assets/images/glass/ic_glass_message.png";
import glass_users from "@/assets/images/glass/ic_glass_users.png";
import { themeVars } from "@/theme/theme.css";

import IntentUsage from "./intent-usage";
import IntentUsageArea from "./intent-usage-area";
import StatCard from "./stat-card";
import TopBrands from "./top-brands";
import TopUserCountry from "./top-installed";
import TopProducts from "./top-products";

function Workbench() {
	const [stats, setStats] = useState<DashboardStats>({
		weekly_sales: "0",
		new_users: "0",
		new_orders: "0",
		bug_reports: "0",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const statsData = await dashboardService.getDashboardStats();
				setStats(statsData);
			} catch (error) {
				console.error("Error fetching dashboard stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	return (
		<div className="p-2">
			<Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
			<Row gutter={[16, 16]} justify="center">
				<Col lg={6} md={12} span={24}>
					<StatCard
						cover={glass_bag}
						title={stats.weekly_sales}
						subtitle="Weekly Sales"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
						loading={loading}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<StatCard
						cover={glass_users}
						title={stats.new_users}
						subtitle="New Users"
						style={{
							color: themeVars.colors.palette.info.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel} / .2)`,
						}}
						loading={loading}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<StatCard
						cover={glass_buy}
						title={stats.new_orders}
						subtitle="New Orders"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
						}}
						loading={loading}
					/>
				</Col>
				<Col lg={6} md={12} span={24}>
					<StatCard
						cover={glass_message}
						title={stats.bug_reports}
						subtitle="Bug Reports"
						style={{
							color: themeVars.colors.palette.error.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.error.defaultChannel} / .2)`,
						}}
						loading={loading}
					/>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-8" justify="center">
				<Col span={24} lg={12} xl={16}>
					<Card title="Website Visits">
						<IntentUsageArea />
					</Card>
				</Col>
				<Col span={24} md={12} lg={8}>
					<IntentUsage />
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={12} lg={16}>
					<TopProducts />
				</Col>
				<Col span={24} md={12} lg={8}>
					<TopBrands />
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-4" justify="center">
				<Col span={24} md={24}>
					<TopUserCountry />
				</Col>
			</Row>
		</div>
	);
}

export default Workbench;
