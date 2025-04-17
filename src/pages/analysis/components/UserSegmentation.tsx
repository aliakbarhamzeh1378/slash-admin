import { Card, Row, Col, Table, Statistic, Progress, Tooltip, Tag, Typography, Divider } from "antd";
import { Column, Pie } from "@ant-design/plots";
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	InfoCircleOutlined,
	TeamOutlined,
	UserOutlined,
	ClockCircleOutlined,
	RetweetOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const UserSegmentation = () => {
	// Sample data for the column chart - User Segments
	const segmentData = [
		{ segment: "New Users", value: 35, type: "Percentage" },
		{ segment: "Active Users", value: 45, type: "Percentage" },
		{ segment: "Power Users", value: 15, type: "Percentage" },
		{ segment: "Inactive Users", value: 5, type: "Percentage" },
	];

	// Sample data for the pie chart - User Behavior
	const behaviorData = [
		{ type: "Product Browsing", value: 40 },
		{ type: "Cart Addition", value: 25 },
		{ type: "Checkout", value: 20 },
		{ type: "Purchase", value: 15 },
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
			render: (value: string) => (
				<Tooltip title="Average time spent per session">
					<span>{value}</span>
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
			title: "Retention Rate",
			dataIndex: "retentionRate",
			key: "retentionRate",
			render: (value: number) => (
				<Tooltip title="Percentage of users who return">
					<span>{value}%</span>
				</Tooltip>
			),
		},
	];

	const tableData = [
		{
			key: "1",
			segment: "New Users",
			users: 3500,
			avgSessionDuration: "8 min",
			engagementScore: 65,
			retentionRate: 45,
		},
		{
			key: "2",
			segment: "Active Users",
			users: 4500,
			avgSessionDuration: "15 min",
			engagementScore: 85,
			retentionRate: 75,
		},
		{
			key: "3",
			segment: "Power Users",
			users: 1500,
			avgSessionDuration: "25 min",
			engagementScore: 95,
			retentionRate: 90,
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2} style={{ color: "#1890ff" }}>
					<span role="img" aria-label="users">
						👥
					</span>{" "}
					User Segmentation
				</Title>
				<Paragraph>
					<Tooltip title="Analyze user behavior patterns to segment your audience into meaningful groups. Use these insights to personalize marketing efforts and improve user engagement.">
						<InfoCircleOutlined className="mr-2" style={{ color: "#1890ff" }} />
					</Tooltip>
					<Text strong>Identify and analyze different user segments</Text> to understand behavior patterns and optimize
					your marketing and product strategies.
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
									<TeamOutlined style={{ marginRight: "8px", color: "#1890ff" }} /> Total Users
								</>
							}
							value={9500}
							precision={0}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+8.5%
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
									<UserOutlined style={{ marginRight: "8px", color: "#52c41a" }} /> Active Users
								</>
							}
							value={4500}
							precision={0}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+12.3%
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
									<ClockCircleOutlined style={{ marginRight: "8px", color: "#faad14" }} /> Avg. Session Duration
								</>
							}
							value={16}
							precision={1}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+2.5 min
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
									<RetweetOutlined style={{ marginRight: "8px", color: "#722ed1" }} /> Retention Rate
								</>
							}
							value={70}
							precision={1}
							valueStyle={{ color: "#3f8600", fontSize: "24px" }}
							suffix={
								<Tooltip title="Compared to last month">
									<Tag color="green" style={{ marginLeft: "8px" }}>
										+5.2%
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
								<span role="img" aria-label="segments">
									📊
								</span>{" "}
								User Segments
							</>
						}
						extra={
							<Tooltip title="Distribution of user segments">
								<InfoCircleOutlined style={{ color: "#1890ff" }} />
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
								<InfoCircleOutlined style={{ color: "#1890ff" }} />
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
								<InfoCircleOutlined style={{ color: "#1890ff" }} />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Table
							columns={columns}
							dataSource={tableData}
							pagination={{ pageSize: 5 }}
							scroll={{ x: true }}
							rowClassName={(_record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default UserSegmentation;
