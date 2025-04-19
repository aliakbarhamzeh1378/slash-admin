import analysisService from "@/api/services/analysisService";
import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";
import type { ProductEngagementResponse } from "@/types/analysis";
import { useEffect, useState } from "react";

import { themeVars } from "@/theme/theme.css";
import {
	InfoCircleOutlined,
} from "@ant-design/icons";
import { Bar, Line } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Spin, Table, Tag, Tooltip, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ProductEngagementTrends = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ProductEngagementResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await analysisService.getProductEngagement();
				setData(response);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Sample data for the bar chart - Product Categories Performance
	const categoryData = [
		{ category: "Electronics", views: 45000, clicks: 32000, conversions: 8500 },
		{ category: "Clothing", views: 38000, clicks: 25000, conversions: 6200 },
		{ category: "Home & Kitchen", views: 28000, clicks: 18000, conversions: 4500 },
		{ category: "Beauty", views: 22000, clicks: 15000, conversions: 3800 },
		{ category: "Sports", views: 18000, clicks: 12000, conversions: 3000 },
	];

	// Transform API data for the line chart
	const trendData = data?.trends.map(trend => ({
		date: trend.date,
		value: trend.engagement_rate * 100, // Convert to percentage
	})) || [];

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

	// Transform API data for the table
	const tableData = data?.trends.map((trend, index) => ({
		key: index.toString(),
		name: `Product ${index + 1}`,
		views: trend.views,
		clicks: trend.clicks,
		ctr: Math.round((trend.clicks / trend.views) * 100),
		conversionRate: Math.round((trend.conversions / trend.views) * 100),
		avgSessionDuration: "3m 45s", // This would come from the API in a real implementation
	})) || [];

	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-96">
				<Text type="danger">{error}</Text>
			</div>
		);
	}

	// Calculate totals from API data
	const trends = data?.trends || [];
	const totalViews = trends.reduce((sum, trend) => sum + trend.views, 0);
	const totalClicks = trends.reduce((sum, trend) => sum + trend.clicks, 0);
	const avgConversionRate = trends.length > 0
		? (trends.reduce((sum, trend) => sum + (trend.conversions / trend.views), 0) / trends.length) * 100
		: 0;

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
						title={totalViews.toLocaleString()}
						subtitle="Total Views"
						style={{
							color: themeVars.colors.palette.primary.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.primary.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={8}>
					<StatCard
						cover={glass_bag}
						title={totalClicks.toLocaleString()}
						subtitle="Total Clicks"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={8}>
					<StatCard
						cover={glass_bag}
						title={`${avgConversionRate.toFixed(1)}%`}
						subtitle="Conversion Rate"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
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
								Engagement Trends
							</>
						}
						extra={
							<Tooltip title="Daily engagement rate trends">
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
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ProductEngagementTrends;
