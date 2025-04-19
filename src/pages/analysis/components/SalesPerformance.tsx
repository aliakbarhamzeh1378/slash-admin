import analysisService from "@/api/services/analysisService";
import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";
import type { SalesPerformanceResponse } from "@/types/analysis";
import { useEffect, useState } from "react";

import { themeVars } from "@/theme/theme.css";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DollarOutlined,
	InfoCircleOutlined,
	PercentageOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { Area, Pie } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Spin, Statistic, Table, Tag, Tooltip, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const SalesPerformance = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SalesPerformanceResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await analysisService.getSalesPerformance();
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

	// Transform API data for the area chart
	const salesData = data?.performance.flatMap(item => [
		{ date: item.date, value: item.revenue, category: "Revenue" },
		{ date: item.date, value: item.orders, category: "Orders" }
	]) || [];

	// Sample data for the pie chart - Sales by Category
	const categoryData = [
		{ type: "Electronics", value: 45 },
		{ type: "Clothing", value: 25 },
		{ type: "Home & Kitchen", value: 15 },
		{ type: "Beauty", value: 10 },
		{ type: "Sports", value: 5 },
	];

	const areaConfig = {
		data: salesData,
		xField: "date",
		yField: "value",
		seriesField: "category",
		smooth: true,
		areaStyle: {
			fillOpacity: 0.6,
		},
		point: {
			size: 5,
			shape: "diamond",
		},
		label: {
			style: {
				fill: "#aaa",
			},
		},
		color: ["#1890ff", "#52c41a"],
	};

	const pieConfig = {
		data: categoryData,
		angleField: "value",
		colorField: "type",
		radius: 0.8,
		label: {
			type: "outer",
			content: "{name} {percentage}",
		},
		interactions: [
			{
				type: "element-active",
			},
		],
	};

	// Enhanced table columns with more metrics
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			sorter: (a: any, b: any) => a.date.localeCompare(b.date),
		},
		{
			title: "Revenue",
			dataIndex: "revenue",
			key: "revenue",
			sorter: (a: any, b: any) => a.revenue - b.revenue,
			render: (value: number) => (
				<Tooltip title="Total sales revenue">
					<span>${value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Orders",
			dataIndex: "orders",
			key: "orders",
			sorter: (a: any, b: any) => a.orders - b.orders,
			render: (value: number) => (
				<Tooltip title="Total number of orders">
					<span>{value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Avg. Order Value",
			dataIndex: "average_order_value",
			key: "average_order_value",
			sorter: (a: any, b: any) => a.average_order_value - b.average_order_value,
			render: (value: number) => (
				<Tooltip title="Average value per order">
					<span>${value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Growth Rate",
			dataIndex: "growth_rate",
			key: "growth_rate",
			sorter: (a: any, b: any) => a.growth_rate - b.growth_rate,
			render: (value: number) => {
				const isPositive = value > 0;
				return (
					<Tooltip title={`${isPositive ? "Increase" : "Decrease"} in sales compared to previous period`}>
						<Tag color={isPositive ? "green" : "red"}>
							{isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(value * 100).toFixed(1)}%
						</Tag>
					</Tooltip>
				);
			},
		},
	];

	// Transform API data for the table
	const tableData = data?.performance || [];

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
	const performance = data?.performance || [];
	const totalRevenue = performance.reduce((sum, item) => sum + item.revenue, 0);
	const totalOrders = performance.reduce((sum, item) => sum + item.orders, 0);
	const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

	// Calculate growth rate (comparing last period to previous period)
	const growthRate = performance.length >= 2
		? (performance[performance.length - 1].revenue - performance[performance.length - 2].revenue) / performance[performance.length - 2].revenue
		: 0;

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>
					<span role="img" aria-label="chart">
						💰
					</span>{" "}
					Sales Performance
				</Title>
				<Paragraph>
					<Tooltip title="Track and analyze your sales performance, including revenue, orders, and growth rates. Use this data to identify trends and optimize your sales strategy.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Monitor sales metrics</Text> to understand your business performance and identify opportunities for growth.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`$${totalRevenue.toLocaleString()}`}
						subtitle="Total Revenue"
						style={{
							color: themeVars.colors.palette.primary.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.primary.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={totalOrders.toLocaleString()}
						subtitle="Total Orders"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`$${avgOrderValue.toLocaleString()}`}
						subtitle="Avg. Order Value"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${(growthRate * 100).toFixed(1)}%`}
						subtitle="Growth Rate"
						style={{
							color: growthRate >= 0 ? themeVars.colors.palette.success.dark : themeVars.colors.palette.error.dark,
							backgroundColor: growthRate >= 0
								? `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`
								: `rgba(${themeVars.colors.palette.error.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={16}>
					<Card
						title={
							<>
								<span role="img" aria-label="area chart">
									📈
								</span>{" "}
								Sales Trend
							</>
						}
						extra={
							<Tooltip title="Revenue and order trends over time">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Area {...areaConfig} />
					</Card>
				</Col>
				<Col span={8}>
					<Card
						title={
							<>
								<span role="img" aria-label="pie chart">
									🥧
								</span>{" "}
								Sales by Category
							</>
						}
						extra={
							<Tooltip title="Distribution of sales across product categories">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Pie {...pieConfig} />
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title={
							<>
								<span role="img" aria-label="table">
									📋
								</span>{" "}
								Sales Performance Details
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

export default SalesPerformance;
