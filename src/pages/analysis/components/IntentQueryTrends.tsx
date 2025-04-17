import { Card, Row, Col, Table, Statistic, Progress, Tooltip, Tag, Typography, Divider } from "antd";
import { Pie, Line } from "@ant-design/plots";
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	InfoCircleOutlined,
	MessageOutlined,
	ClockCircleOutlined,
	CheckCircleOutlined,
	SmileOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const IntentQueryTrends = () => {
	// Sample data for the pie chart - Query Distribution
	const queryData = [
		{ type: "Product Search", value: 40 },
		{ type: "Technical Support", value: 25 },
		{ type: "Pricing Inquiry", value: 20 },
		{ type: "Feature Request", value: 15 },
	];

	// Sample data for the line chart - Query Volume Trend
	const trendData = [
		{ date: "2024-01", value: 1200 },
		{ date: "2024-02", value: 1350 },
		{ date: "2024-03", value: 1280 },
		{ date: "2024-04", value: 1500 },
		{ date: "2024-05", value: 1420 },
		{ date: "2024-06", value: 1600 },
	];

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

	const tableData = [
		{
			key: "1",
			queryType: "Product Search",
			count: 1250,
			avgResponseTime: "1.2s",
			successRate: 95,
			satisfaction: 4.5,
		},
		{
			key: "2",
			queryType: "Technical Support",
			count: 850,
			avgResponseTime: "2.5s",
			successRate: 88,
			satisfaction: 4.2,
		},
		{
			key: "3",
			queryType: "Pricing Inquiry",
			count: 650,
			avgResponseTime: "1.8s",
			successRate: 92,
			satisfaction: 4.7,
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2} style={{ color: "#722ed1" }}>
					<span role="img" aria-label="intent">
						🎯
					</span>{" "}
					Intent Query Trends
				</Title>
				<Paragraph>
					<Tooltip title="Analyze user queries to understand customer intent, improve response accuracy, and optimize your chatbot's performance. Track success rates and user satisfaction to enhance the customer experience.">
						<InfoCircleOutlined className="mr-2" style={{ color: "#722ed1" }} />
					</Tooltip>
					<Text strong>Monitor and analyze user queries</Text> to improve your chatbot's understanding of customer
					intent and enhance response quality.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<Card
						hoverable
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
						bodyStyle={{ padding: "20px" }}
					>
						<Statistic
							title={
								<>
									<MessageOutlined style={{ marginRight: "8px", color: "#722ed1" }} /> Total Queries
								</>
							}
							value={2750}
							precision={0}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+15.2%
									</Tag>
								</Tooltip>
							}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card
						hoverable
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
						bodyStyle={{ padding: "20px" }}
					>
						<Statistic
							title={
								<>
									<ClockCircleOutlined style={{ marginRight: "8px", color: "#1890ff" }} /> Avg. Response Time
								</>
							}
							value={1.8}
							precision={1}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										-0.3s
									</Tag>
								</Tooltip>
							}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card
						hoverable
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
						bodyStyle={{ padding: "20px" }}
					>
						<Statistic
							title={
								<>
									<CheckCircleOutlined style={{ marginRight: "8px", color: "#52c41a" }} /> Success Rate
								</>
							}
							value={91.5}
							precision={1}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+2.1%
									</Tag>
								</Tooltip>
							}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card
						hoverable
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
						bodyStyle={{ padding: "20px" }}
					>
						<Statistic
							title={
								<>
									<SmileOutlined style={{ marginRight: "8px", color: "#faad14" }} /> User Satisfaction
								</>
							}
							value={4.4}
							precision={1}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+0.2
									</Tag>
								</Tooltip>
							}
						/>
					</Card>
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
								<InfoCircleOutlined style={{ color: "#722ed1" }} />
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
								<InfoCircleOutlined style={{ color: "#722ed1" }} />
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
								<InfoCircleOutlined style={{ color: "#722ed1" }} />
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
