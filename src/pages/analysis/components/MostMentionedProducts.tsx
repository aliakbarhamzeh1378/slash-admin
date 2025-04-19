import analysisService from "@/api/services/analysisService";
import type { MostMentionedProductsResponse, ProductMention } from "@/types/analysis";
import { ArrowDownOutlined, ArrowUpOutlined, InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { Bar } from "@ant-design/plots";
import { Card, Col, Divider, Progress, Row, Spin, Statistic, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph, Text } = Typography;

const MostMentionedProducts = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<MostMentionedProductsResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await analysisService.getMostMentionedProducts();
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

	// Transform API data for the bar chart
	const chartData = data?.products.map(product => ({
		product: product.name,
		mentions: product.mentions
	})) || [];

	const config = {
		data: chartData,
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

	// Helper function to determine sentiment from score
	const getSentimentFromScore = (score: number): string => {
		if (score >= 0.6) return "Positive";
		if (score <= 0.4) return "Negative";
		return "Neutral";
	};

	// Helper function to format growth rate
	const formatGrowthRate = (rate: number): string => {
		const prefix = rate >= 0 ? "+" : "";
		return `${prefix}${(rate * 100).toFixed(1)}%`;
	};

	// Transform API data for the table
	const tableData = data?.products.map((product, index) => ({
		key: index.toString(),
		product: product.name,
		mentions: product.mentions,
		sentiment: getSentimentFromScore(product.sentiment_score),
		growth: formatGrowthRate(product.growth_rate)
	})) || [];

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

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>
					<span role="img" aria-label="mentions">💬</span>{" "}
					Most Mentioned Products
				</Title>
				<Paragraph>
					<Tooltip title="Identify which products are most frequently discussed by users in conversations and queries. Use these insights to prioritize inventory, marketing, and product development efforts.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Track which products are most frequently mentioned</Text> in user conversations to understand customer interest and optimize your product strategy.
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
