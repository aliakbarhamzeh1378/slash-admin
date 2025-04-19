import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	InfoCircleOutlined,
	MessageOutlined,
	SmileOutlined,
} from "@ant-design/icons";

import analysisService from "@/api/services/analysisService";
import StatCard from "@/pages/dashboard/workbench/stat-card";
import { themeVars } from "@/theme/theme.css";
import type { IntentQueryResponse } from "@/types/analysis";
import { Line, Pie } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Spin, Statistic, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph, Text } = Typography;

const IntentQueryTrends = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<IntentQueryResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await analysisService.getIntentQueryTrends();
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

	// Transform API data for the pie chart - Query Distribution
	const queryData = data?.trends.reduce((acc, trend) => {
		for (const [type, value] of Object.entries(trend.intents)) {
			const existingType = acc.find(item => item.type === type);
			if (existingType) {
				existingType.value += value;
			} else {
				acc.push({ type, value });
			}
		}
		return acc;
	}, [] as { type: string; value: number }[]) || [];

	// Transform API data for the line chart - Query Volume Trend
	const trendData = data?.trends.map(trend => ({
		date: trend.date,
		value: trend.total_queries,
	})) || [];

	// Calculate summary statistics
	const totalQueries = data?.trends.reduce((sum, trend) => sum + trend.total_queries, 0) || 0;
	const avgQueriesPerDay = totalQueries / (data?.trends.length || 1);
	const successRate = 92.5; // This would come from the API in a real implementation
	const userSatisfaction = 4.6; // This would come from the API in a real implementation

	// Transform API data for the table
	const tableData = queryData.map((item, index) => ({
		key: String(index + 1),
		queryType: item.type,
		count: item.value,
		avgResponseTime: "1.8s", // This would come from the API in a real implementation
		successRate: 90 + Math.random() * 10, // This would come from the API in a real implementation
		satisfaction: 4 + Math.random(), // This would come from the API in a real implementation
	}));

	const pieConfig = {
		data: queryData,
		angleField: "value",
		colorField: "type",
		radius: 0.8,
		label: {
			type: "outer",
		},
		interactions: [
			{
				type: "element-active",
			},
		],
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
	};

	// Enhanced table columns with more metrics
	const columns = [
		{
			title: "Query Type",
			dataIndex: "queryType",
			key: "queryType",
			render: (text: string) => <Tag color="blue">{text}</Tag>,
		},
		{
			title: "Count",
			dataIndex: "count",
			key: "count",
			sorter: (a: any, b: any) => a.count - b.count,
			render: (value: number) => (
				<Tooltip title="Total number of queries">
					<span>{value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Avg. Response Time",
			dataIndex: "avgResponseTime",
			key: "avgResponseTime",
			sorter: (a: any, b: any) => a.avgResponseTime - b.avgResponseTime,
			render: (value: string) => (
				<Tooltip title="Average time to respond">
					<span>{value}</span>
				</Tooltip>
			),
		},
		{
			title: "Success Rate",
			dataIndex: "successRate",
			key: "successRate",
			sorter: (a: any, b: any) => a.successRate - b.successRate,
			render: (value: number) => (
				<Tooltip title="Percentage of successfully resolved queries">
					<Progress percent={value} size="small" />
				</Tooltip>
			),
		},
		{
			title: "User Satisfaction",
			dataIndex: "satisfaction",
			key: "satisfaction",
			render: (value: number) => (
				<Tooltip title="User satisfaction score (1-5)">
					<span>{value.toFixed(1)}/5.0</span>
				</Tooltip>
			),
		},
	];

	if (loading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Text type="danger">{error}</Text>
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>
					<span role="img" aria-label="intent">
						🎯
					</span>{" "}
					Intent Query Trends
				</Title>
				<Paragraph>
					<Tooltip title="Analyze user queries to understand customer intent, improve response accuracy, and optimize your chatbot's performance. Track success rates and user satisfaction to enhance the customer experience.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Monitor and analyze user queries</Text> to improve your chatbot's understanding of customer
					intent and enhance response quality.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={totalQueries.toLocaleString()}
						subtitle="Total Queries"
						style={{
							color: themeVars.colors.palette.primary.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.primary.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title="1.8s"
						subtitle="Avg Response Time"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${successRate}%`}
						subtitle="Success Rate"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${userSatisfaction}/5`}
						subtitle="User Satisfaction"
						style={{
							color: themeVars.colors.palette.info.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={12}>
					<Card
						title={
							<>
								<span role="img" aria-label="distribution">
									🎨
								</span>{" "}
								Query Distribution
							</>
						}
						extra={
							<Tooltip title="Distribution of query types">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Pie {...pieConfig} />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title={
							<>
								<span role="img" aria-label="trend">
									📈
								</span>{" "}
								Query Volume Trend
							</>
						}
						extra={
							<Tooltip title="Monthly query volume trend">
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
								<span role="img" aria-label="details">
									📋
								</span>{" "}
								Query Performance Details
							</>
						}
						extra={
							<Tooltip title="Detailed query performance metrics">
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

export default IntentQueryTrends;
