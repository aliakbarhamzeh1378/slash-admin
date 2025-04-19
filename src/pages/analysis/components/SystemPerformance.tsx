import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import { Card, Row, Col, Statistic, Table, Progress, Tooltip, Tag, Typography } from "antd";
import { Line, Area } from "@ant-design/plots";
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { themeVars } from "@/theme/theme.css";
import StatCard from "@/pages/dashboard/workbench/stat-card";

const { Title, Paragraph } = Typography;

const SystemPerformance = () => {
	// Sample data for the line chart - System Load
	const loadData = [
		{ time: "00:00", value: 30, type: "CPU" },
		{ time: "04:00", value: 25, type: "CPU" },
		{ time: "08:00", value: 45, type: "CPU" },
		{ time: "12:00", value: 50, type: "CPU" },
		{ time: "16:00", value: 40, type: "CPU" },
		{ time: "20:00", value: 35, type: "CPU" },
		{ time: "00:00", value: 40, type: "Memory" },
		{ time: "04:00", value: 35, type: "Memory" },
		{ time: "08:00", value: 55, type: "Memory" },
		{ time: "12:00", value: 60, type: "Memory" },
		{ time: "16:00", value: 50, type: "Memory" },
		{ time: "20:00", value: 45, type: "Memory" },
	];

	// Sample data for the area chart - Response Time
	const responseData = [
		{ time: "00:00", value: 100 },
		{ time: "04:00", value: 95 },
		{ time: "08:00", value: 120 },
		{ time: "12:00", value: 110 },
		{ time: "16:00", value: 105 },
		{ time: "20:00", value: 100 },
	];

	const lineConfig = {
		data: loadData,
		xField: "time",
		yField: "value",
		seriesField: "type",
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

	const areaConfig = {
		data: responseData,
		xField: "time",
		yField: "value",
		smooth: true,
		areaStyle: {
			fillOpacity: 0.3,
		},
	};

	// Enhanced table columns with more metrics
	const columns = [
		{
			title: "Metric",
			dataIndex: "metric",
			key: "metric",
			render: (text: string) => <Tag color="blue">{text}</Tag>,
		},
		{
			title: "Current Value",
			dataIndex: "currentValue",
			key: "currentValue",
			render: (value: number, record: any) => (
				<Tooltip title={`Current ${record.metric} value`}>
					<span>
						{value}
						{record.unit}
					</span>
				</Tooltip>
			),
		},
		{
			title: "Peak Value",
			dataIndex: "peakValue",
			key: "peakValue",
			render: (value: number, record: any) => (
				<Tooltip title={`Peak ${record.metric} value`}>
					<span>
						{value}
						{record.unit}
					</span>
				</Tooltip>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<Tag color={status === "Healthy" ? "green" : status === "Warning" ? "orange" : "red"}>{status}</Tag>
			),
		},
		{
			title: "Trend",
			dataIndex: "trend",
			key: "trend",
			render: (value: number) => (
				<Tooltip title="Compared to last hour">
					<span style={{ color: value >= 0 ? "#3f8600" : "#cf1322" }}>
						{value >= 0 ? "+" : ""}
						{value}%
					</span>
				</Tooltip>
			),
		},
	];

	const tableData = [
		{
			key: "1",
			metric: "CPU Usage",
			currentValue: 45,
			peakValue: 75,
			status: "Healthy",
			trend: -5,
			unit: "%",
		},
		{
			key: "2",
			metric: "Memory Usage",
			currentValue: 60,
			peakValue: 85,
			status: "Warning",
			trend: 10,
			unit: "%",
		},
		{
			key: "3",
			metric: "Response Time",
			currentValue: 120,
			peakValue: 200,
			status: "Healthy",
			trend: -15,
			unit: "ms",
		},
	];

	return (
		<div className="p-4">
			<div className="mb-4">
				<Title level={2}>System Performance</Title>
				<Paragraph>
					<Tooltip title="Monitor system health metrics including CPU usage, memory consumption, response times, and error rates. Use these insights to optimize performance and prevent system issues.">
						<InfoCircleOutlined className="mr-2" />
					</Tooltip>
					Track key system metrics to ensure optimal performance and identify potential issues before they impact user
					experience.
				</Paragraph>
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
				<Col span={12}>
					<Card
						title="System Load"
						extra={
							<Tooltip title="CPU and Memory usage over time">
								<InfoCircleOutlined />
							</Tooltip>
						}
					>
						<Line {...lineConfig} />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title="Response Time Trend"
						extra={
							<Tooltip title="API response time trend">
								<InfoCircleOutlined />
							</Tooltip>
						}
					>
						<Area {...areaConfig} />
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title="System Metrics"
						extra={
							<Tooltip title="Detailed system performance metrics">
								<InfoCircleOutlined />
							</Tooltip>
						}
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

export default SystemPerformance;
