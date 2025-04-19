import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";
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
import { Card, Col, Divider, Progress, Row, Statistic, Table, Tag, Tooltip, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const SalesPerformance = () => {
	// Sample data for the area chart - Sales Trend
	const salesData = [
		{ date: "2024-01", value: 3000, category: "Revenue" },
		{ date: "2024-02", value: 3500, category: "Revenue" },
		{ date: "2024-03", value: 3200, category: "Revenue" },
		{ date: "2024-04", value: 4000, category: "Revenue" },
		{ date: "2024-05", value: 3800, category: "Revenue" },
		{ date: "2024-06", value: 4200, category: "Revenue" },
		{ date: "2024-01", value: 150, category: "Orders" },
		{ date: "2024-02", value: 180, category: "Orders" },
		{ date: "2024-03", value: 165, category: "Orders" },
		{ date: "2024-04", value: 200, category: "Orders" },
		{ date: "2024-05", value: 190, category: "Orders" },
		{ date: "2024-06", value: 210, category: "Orders" },
	];

	// Sample data for the pie chart - Sales by Category
	const categoryData = [
		{ type: "Electronics", value: 40 },
		{ type: "Clothing", value: 25 },
		{ type: "Home & Kitchen", value: 20 },
		{ type: "Beauty", value: 15 },
	];

	const areaConfig = {
		data: salesData,
		xField: "date",
		yField: "value",
		seriesField: "category",
		smooth: true,
		areaStyle: {
			fillOpacity: 0.3,
		},
		legend: {
			position: "top",
		},
	};

	const pieConfig = {
		data: categoryData,
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
			title: "Product",
			dataIndex: "product",
			key: "product",
			render: (text: string) => <a href="/analysis/sales">{text}</a>,
		},
		{
			title: "Revenue",
			dataIndex: "revenue",
			key: "revenue",
			sorter: (a: any, b: any) => a.revenue - b.revenue,
			render: (value: number) => (
				<Tooltip title="Total revenue generated">
					<span>${value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Orders",
			dataIndex: "orders",
			key: "orders",
			sorter: (a: any, b: any) => a.orders - b.orders,
		},
		{
			title: "Avg. Order Value",
			dataIndex: "avgOrderValue",
			key: "avgOrderValue",
			sorter: (a: any, b: any) => a.avgOrderValue - b.avgOrderValue,
			render: (value: number) => (
				<Tooltip title="Average value per order">
					<span>${value.toLocaleString()}</span>
				</Tooltip>
			),
		},
		{
			title: "Growth",
			dataIndex: "growth",
			key: "growth",
			render: (value: number) => (
				<Tag color={value >= 0 ? "green" : "red"}>
					{value >= 0 ? "+" : ""}
					{value}%
				</Tag>
			),
		},
	];

	const tableData = [
		{
			key: "1",
			product: "Smartphone X",
			revenue: 125000,
			orders: 250,
			avgOrderValue: 500,
			growth: 15,
		},
		{
			key: "2",
			product: "Laptop Pro",
			revenue: 98000,
			orders: 120,
			avgOrderValue: 816,
			growth: 8,
		},
		{
			key: "3",
			product: "Wireless Earbuds",
			revenue: 75000,
			orders: 300,
			avgOrderValue: 250,
			growth: 25,
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2} >
					<span role="img" aria-label="sales">
						💰
					</span>{" "}
					Sales Performance
				</Title>
				<Paragraph>
					<Tooltip title="Analyze your sales data to track revenue, order volume, and average order value. Identify trends and opportunities to optimize pricing and inventory strategies.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					<Text strong>Monitor key sales metrics</Text> to understand your business performance and identify
					opportunities for growth and optimization.
				</Paragraph>
				<Divider style={{ margin: "12px 0" }} />
			</div>
			<Row gutter={[16, 16]}>
				<Col span={6}>
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
				<Col span={6}>
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
				<Col span={6}>
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
				<Col span={6}>
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
				<Col span={16}>
					<Card
						title={
							<>
								<span role="img" aria-label="trend">
									📈
								</span>{" "}
								Sales Trend
							</>
						}
						extra={
							<Tooltip title="Revenue and order trends over time">
								<InfoCircleOutlined style={{ color: "#52c41a" }} />
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
								<span role="img" aria-label="pie">
									🥧
								</span>{" "}
								Sales by Category
							</>
						}
						extra={
							<Tooltip title="Revenue distribution by product category">
								<InfoCircleOutlined style={{ color: "#52c41a" }} />
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
									📊
								</span>{" "}
								Product Performance
							</>
						}
						extra={
							<Tooltip title="Detailed product sales metrics">
								<InfoCircleOutlined style={{ color: "#52c41a" }} />
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

export default SalesPerformance;
