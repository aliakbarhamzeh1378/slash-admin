import { Card, Row, Col, Statistic, Tabs } from "antd";
import {
	UserOutlined,
	ShoppingCartOutlined,
	SearchOutlined,
	TeamOutlined,
	DashboardOutlined,
	StarOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import UserBehaviorInsights from "./components/UserBehaviorInsights";
import ProductEngagementTrends from "./components/ProductEngagementTrends";
import IntentQueryTrends from "./components/IntentQueryTrends";
import UserSegmentation from "./components/UserSegmentation";
import SystemPerformance from "./components/SystemPerformance";
import MostMentionedProducts from "./components/MostMentionedProducts";

const AnalyticsDashboard = () => {
	const [activeTab, setActiveTab] = useState("1");

	const items = [
		{
			key: "1",
			label: "User Behavior",
			icon: <UserOutlined />,
			children: <UserBehaviorInsights />,
		},
		{
			key: "2",
			label: "Product Engagement",
			icon: <ShoppingCartOutlined />,
			children: <ProductEngagementTrends />,
		},
		{
			key: "3",
			label: "Intent/Query",
			icon: <SearchOutlined />,
			children: <IntentQueryTrends />,
		},
		{
			key: "4",
			label: "User Segmentation",
			icon: <TeamOutlined />,
			children: <UserSegmentation />,
		},
		{
			key: "5",
			label: "System Performance",
			icon: <DashboardOutlined />,
			children: <SystemPerformance />,
		},
		{
			key: "6",
			label: "Top Products",
			icon: <StarOutlined />,
			children: <MostMentionedProducts />,
		},
	];

	return (
		<div className="p-6">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Card>
						<Tabs activeKey={activeTab} onChange={setActiveTab} items={items} type="card" size="large" />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default AnalyticsDashboard;
