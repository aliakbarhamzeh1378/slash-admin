import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";

import { themeVars } from "@/theme/theme.css";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	ClockCircleOutlined,
	EyeOutlined,
	InfoCircleOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Bar, Line } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Statistic, Table, Tag, Tooltip, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ProductEngagementTrends = () => {
	// Sample data for the bar chart - Product Categories Performance
	const categoryData = [
		{ category: "Electronics", views: 2500, clicks: 1800, conversions: 450 },
		{ category: "Clothing", views: 3200, clicks: 2100, conversions: 380 },
		{ category: "Home & Kitchen", views: 1800, clicks: 1200, conversions: 280 },
		{ category: "Beauty", views: 1500, clicks: 900, conversions: 220 },
		{ category: "Sports", views: 1200, clicks: 800, conversions: 180 },
	];

	// Sample data for the line chart - Engagement Trends
	const trendData = [
		{ date: "2024-01", value: 65 },
		{ date: "2024-02", value: 72 },
		{ date: "2024-03", value: 68 },
		{ date: "2024-04", value: 75 },
		{ date: "2024-05", value: 82 },
		{ date: "2024-06", value: 78 },
	];

	const barConfig = {
		data: categoryData,
		isGroup: true,
		xField: "category",
		yField: "value",
		seriesField: "type",
		groupField: "category",
		columnStyle: {
			radius: [20, 20, 0, 0],
		},
		label: {
			position: "middle",
			layout: [{ type: "interval-adjust-position" }, { type: "interval-hide-overlap" }, { type: "adjust-color" }],
		},
		color: ["#1890ff", "#52c41a", "#faad14"],
	};

	const lineConfig = {
		data: trendData,
		xField: "date",
		yField: "value",
		smooth: true,
		point: {
			size: 5,
			shape: "diamond",
		},
		label: {
			style: {
				fill: "#aaa",
			},
		},
		color: "#722ed1",
	};

	// Enhanced table columns with more metrics
	const columns = [
		{
			title: "Product Name",
			dataIndex: "name",
			key: "name",
			render: (text: string) => (
				<a href="/analysis/product" style={{ color: "#1890ff", fontWeight: "bold" }}>
					{text}
				</a>
			),
		},
		{
			title: "Views",
			dataIndex: "views",
			key: "views",
			sorter: (a: any, b: any) => a.views - b.views,
			render: (value: number) => (
				<Tooltip title="Total number of product views">
					<span>{value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Clicks",
			dataIndex: "clicks",
			key: "clicks",
			sorter: (a: any, b: any) => a.clicks - b.clicks,
			render: (value: number) => (
				<Tooltip title="Total number of product clicks">
					<span>{value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "CTR",
			dataIndex: "ctr",
			key: "ctr",
			sorter: (a: any, b: any) => a.ctr - b.ctr,
			render: (value: number) => (
				<Tooltip title="Click-Through Rate">
					<Tag color={value > 35 ? "green" : value > 25 ? "blue" : "orange"}>{value}%</Tag>
				</Tooltip>
			),
		},
		{
			title: "Conversion Rate",
			dataIndex: "conversionRate",
			key: "conversionRate",
			sorter: (a: any, b: any) => a.conversionRate - b.conversionRate,
			render: (value: number) => (
				<Tooltip title="Percentage of views that resulted in purchases">
					<Progress
						percent={value}
						size="small"
						strokeColor={{
							"0%": "#108ee9",
							"100%": "#87d068",
						}}
					/>
				</Tooltip>
			),
		},
		{
			title: "Avg. Session Duration",
			dataIndex: "avgSessionDuration",
			key: "avgSessionDuration",
			render: (value: string) => (
				<Tooltip title="Average time spent viewing the product">
					<span>{value}</span>
				</Tooltip>
			),
		},
	];

	const tableData = [
		{
			key: "1",
			name: "Smartphone X",
			views: 12500,
			clicks: 4500,
			ctr: 36,
			conversionRate: 15,
			avgSessionDuration: "2m 30s",
		},
		{
			key: "2",
			name: "Laptop Pro",
			views: 8900,
			clicks: 3200,
			ctr: 28,
			conversionRate: 12,
			avgSessionDuration: "3m 15s",
		},
		{
			key: "3",
			name: "Wireless Earbuds",
			views: 15600,
			clicks: 7800,
			ctr: 42,
			conversionRate: 18,
			avgSessionDuration: "1m 45s",
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>
					<span role="img" aria-label="chart">
						📊
					</span>{" "}
					Product Engagement Trends
				</Title>
				<Paragraph>
					<Tooltip title="Track and analyze how users interact with your products, including views, clicks, and conversion rates. Use this data to optimize product listings and improve user engagement.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Monitor product performance metrics</Text> to understand user behavior and optimize your product
					catalog for better engagement and conversions.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<StatCard
						cover={glass_bag}
						title="714k"
						subtitle="Weekly Sales"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={8}>
					<StatCard
						cover={glass_bag}
						title="714k"
						subtitle="Weekly Sales"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={8}>
					<StatCard
						cover={glass_bag}
						title="714k"
						subtitle="Weekly Sales"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={12}>
					<Card
						title={
							<>
								<span role="img" aria-label="bar chart">
									📈
								</span>{" "}
								Category Performance
							</>
						}
						extra={
							<Tooltip title="Product category engagement metrics">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Bar {...barConfig} />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title={
							<>
								<span role="img" aria-label="line chart">
									📉
								</span>{" "}
								Engagement Trend
							</>
						}
						extra={
							<Tooltip title="Monthly engagement trend">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Line {...lineConfig} />
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title={
							<>
								<span role="img" aria-label="table">
									📋
								</span>{" "}
								Product Performance Details
							</>
						}
						extra={
							<Tooltip title="Detailed product engagement metrics">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Table
							columns={columns}
							dataSource={tableData}
							pagination={{ pageSize: 5 }}
							scroll={{ x: true }}
							rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ProductEngagementTrends;
