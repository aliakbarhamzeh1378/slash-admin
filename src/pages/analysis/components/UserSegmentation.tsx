import analysisService from "@/api/services/analysisService";
import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";
import { themeVars } from "@/theme/theme.css";
import { useEffect, useState } from "react";

import type { UserSegmentationResponse } from "@/types/analysis";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	ClockCircleOutlined,
	InfoCircleOutlined,
	RetweetOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Column, Pie } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Statistic, Table, Tag, Tooltip, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const UserSegmentation = () => {
	const [loading, setLoading] = useState(true);
	const [segmentationData, setSegmentationData] = useState<UserSegmentationResponse | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await analysisService.getUserSegmentation();
				setSegmentationData(response);
			} catch (error) {
				console.error("Error fetching user segmentation data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Transform API data for the column chart
	const segmentData = segmentationData?.segments.map(segment => ({
		segment: segment.name,
		value: segment.percentage * 100,
		type: "Percentage"
	})) || [];

	// Sample data for the pie chart - User Behavior (since it's not in the API)
	const behaviorData = [
		{ type: "Product Browsing", value: 35 },
		{ type: "Cart Addition", value: 25 },
		{ type: "Checkout", value: 20 },
		{ type: "Purchase", value: 15 },
		{ type: "Reviews", value: 5 },
	];

	const columnConfig = {
		data: segmentData,
		xField: "segment",
		yField: "value",
		seriesField: "type",
		label: {
			position: "middle",
			style: {
				fill: "#FFFFFF",
			},
		},
	};

	const pieConfig = {
		data: behaviorData,
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

	// Enhanced table columns with more metrics
	const columns = [
		{
			title: "Segment",
			dataIndex: "segment",
			key: "segment",
			render: (text: string) => <Tag color="blue">{text}</Tag>,
		},
		{
			title: "Users",
			dataIndex: "users",
			key: "users",
			sorter: (a: any, b: any) => a.users - b.users,
			render: (value: number) => (
				<Tooltip title="Total number of users in segment">
					<span>{value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Avg. Session Duration",
			dataIndex: "avgSessionDuration",
			key: "avgSessionDuration",
			render: (value: number) => (
				<Tooltip title="Average time spent per session">
					<span>{value} min</span>
				</Tooltip>
			),
		},
		{
			title: "Engagement Score",
			dataIndex: "engagementScore",
			key: "engagementScore",
			sorter: (a: any, b: any) => a.engagementScore - b.engagementScore,
			render: (value: number) => (
				<Tooltip title="User engagement score (0-100)">
					<Progress percent={value} size="small" />
				</Tooltip>
			),
		},
		{
			title: "Features Used",
			dataIndex: "featuresUsed",
			key: "featuresUsed",
			render: (value: number) => (
				<Tooltip title="Number of features used by segment">
					<span>{value}</span>
				</Tooltip>
			),
		},
	];

	// Transform API data for the table
	const tableData = segmentationData?.segments.map((segment, index) => ({
		key: String(index + 1),
		segment: segment.name,
		users: segment.count,
		avgSessionDuration: segment.avg_session_duration,
		engagementScore: Math.round((segment.features_used / 15) * 100), // Calculate engagement score based on features used
		featuresUsed: segment.features_used,
	})) || [];

	// Calculate statistics for the stat cards
	const totalUsers = segmentationData?.total_users || 0;
	const activeUsers = segmentationData?.segments.find(s => s.name === "Regular Users")?.count || 0;
	const newUsers = segmentationData?.segments.find(s => s.name === "New Users")?.count || 0;
	const retentionRate = Math.round((activeUsers / totalUsers) * 100);

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>
					<span role="img" aria-label="users">
						👥
					</span>{" "}
					User Segmentation
				</Title>
				<Paragraph>
					<Tooltip title="Analyze user behavior patterns to segment your audience into meaningful groups. Use these insights to personalize marketing efforts and improve user engagement.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Identify and analyze different user segments</Text> to understand behavior patterns and optimize
					your marketing and product strategies.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={totalUsers.toLocaleString()}
						subtitle="Total Users"
						style={{
							color: themeVars.colors.palette.primary.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.primary.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={activeUsers.toLocaleString()}
						subtitle="Active Users"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={newUsers.toLocaleString()}
						subtitle="New Users"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${retentionRate}%`}
						subtitle="Retention Rate"
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
								<span role="img" aria-label="segments">
									📊
								</span>{" "}
								User Segments
							</>
						}
						extra={
							<Tooltip title="Distribution of user segments">
								<InfoCircleOutlined />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Column {...columnConfig} />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title={
							<>
								<span role="img" aria-label="behavior">
									🎯
								</span>{" "}
								User Behavior
							</>
						}
						extra={
							<Tooltip title="Distribution of user actions">
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
								<span role="img" aria-label="details">
									📋
								</span>{" "}
								Segment Details
							</>
						}
						extra={
							<Tooltip title="Detailed segment metrics">
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
							loading={loading}
							rowClassName={(_record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default UserSegmentation;
