import { Card, Row, Col, Table, Statistic, Progress, Tooltip, Tag, Typography, Divider } from "antd";
import { Bar } from "@ant-design/plots";
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const MostMentionedProducts = () => {
	// Sample data for the bar chart
	const data = [
		{ product: "Product A", mentions: 150 },
		{ product: "Product B", mentions: 120 },
		{ product: "Product C", mentions: 90 },
		{ product: "Product D", mentions: 80 },
		{ product: "Product E", mentions: 70 },
	];

	const config = {
		data,
		xField: "mentions",
		yField: "product",
		seriesField: "product",
		legend: {
			position: "top-left",
		},
		barStyle: {
			radius: [4, 4, 0, 0],
		},
		color: ["#1890ff", "#52c41a", "#faad14", "#722ed1", "#f5222d"],
	};

	// Sample data for the table
	const columns = [
		{
			title: "Product",
			dataIndex: "product",
			key: "product",
			render: (text: string) => (
				<a href="/analysis/products" style={{ color: "#1890ff", fontWeight: "bold" }}>
					{text}
				</a>
			),
		},
		{
			title: "Mentions",
			dataIndex: "mentions",
			key: "mentions",
			sorter: (a: any, b: any) => a.mentions - b.mentions,
			render: (value: number) => (
				<Tooltip title="Total number of mentions">
					<Tag color="blue">{value}</Tag>
				</Tooltip>
			),
		},
		{
			title: "Sentiment",
			dataIndex: "sentiment",
			key: "sentiment",
			render: (text: string) => (
				<Tag color={text === "Positive" ? "green" : text === "Neutral" ? "blue" : "orange"}>{text}</Tag>
			),
		},
		{
			title: "Growth",
			dataIndex: "growth",
			key: "growth",
			sorter: (a: any, b: any) => Number.parseFloat(a.growth) - Number.parseFloat(b.growth),
			render: (value: string) => <Tag color={value.startsWith("+") ? "green" : "red"}>{value}</Tag>,
		},
	];

	const tableData = [
		{
			key: "1",
			product: "Product A",
			mentions: 150,
			sentiment: "Positive",
			growth: "+15%",
		},
		{
			key: "2",
			product: "Product B",
			mentions: 120,
			sentiment: "Neutral",
			growth: "+5%",
		},
		{
			key: "3",
			product: "Product C",
			mentions: 90,
			sentiment: "Positive",
			growth: "+25%",
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2} style={{ color: "#faad14" }}>
					<span role="img" aria-label="mentions">
						💬
					</span>{" "}
					Most Mentioned Products
				</Title>
				<Paragraph>
					<Tooltip title="Identify which products are most frequently discussed by users in conversations and queries. Use these insights to prioritize inventory, marketing, and product development efforts.">
						<InfoCircleOutlined className="mr-2" style={{ color: "#faad14" }} />
					</Tooltip>
					<Text strong>Track which products are most frequently mentioned</Text> in user conversations to understand
					customer interest and optimize your product strategy.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Card
						title={
							<>
								<span role="img" aria-label="chart">
									📊
								</span>{" "}
								Product Mentions
							</>
						}
						extra={
							<Tooltip title="Product mention frequency">
								<InfoCircleOutlined style={{ color: "#faad14" }} />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Bar {...config} />
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title={
							<>
								<span role="img" aria-label="details">
									📋
								</span>{" "}
								Product Details
							</>
						}
						extra={
							<Tooltip title="Detailed product mention metrics">
								<InfoCircleOutlined style={{ color: "#faad14" }} />
							</Tooltip>
						}
						style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
					>
						<Table
							columns={columns}
							dataSource={tableData}
							pagination={{ pageSize: 5 }}
							rowClassName={(_record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default MostMentionedProducts;
