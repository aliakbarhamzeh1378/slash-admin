import analysisService from "@/api/services/analysisService";
import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import StatCard from "@/pages/dashboard/workbench/stat-card";
import { themeVars } from "@/theme/theme.css";
import type { SystemMetric, SystemPerformanceResponse } from "@/types/analysis";
import { ArrowDownOutlined, ArrowUpOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Area, Line } from "@ant-design/plots";
import { Alert, Card, Col, Progress, Row, Spin, Statistic, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

const SystemPerformance = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SystemPerformanceResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await analysisService.getSystemPerformance();
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

	// Transform API data for the line chart - System Load
	const loadData = data?.metrics.flatMap(metric => [
		{ time: metric.date, value: metric.cpu_usage, type: "CPU" },
		{ time: metric.date, value: metric.memory_usage, type: "Memory" }
	]) || [];

	// Transform API data for the area chart - Response Time
	const responseData = data?.metrics.map(metric => ({
		time: metric.date,
		value: metric.response_time
	})) || [];

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

	// Get the latest metrics for the stat cards
	const latestMetrics = data?.metrics[data.metrics.length - 1] || {
		cpu_usage: 0,
		memory_usage: 0,
		response_time: 0,
		error_rate: 0
	};

	// Calculate status based on thresholds
	const getStatus = (value: number, metric: string) => {
		switch (metric) {
			case "CPU Usage":
				return value > 80 ? "Critical" : value > 60 ? "Warning" : "Healthy";
			case "Memory Usage":
				return value > 85 ? "Critical" : value > 70 ? "Warning" : "Healthy";
			case "Response Time":
				return value > 300 ? "Critical" : value > 200 ? "Warning" : "Healthy";
			case "Error Rate":
				return value > 1 ? "Critical" : value > 0.5 ? "Warning" : "Healthy";
			default:
				return "Healthy";
		}
	};

	// Calculate trend (mock for now, could be implemented with real data)
	const getTrend = (current: number, previous: number) => {
		if (!previous) return 0;
		return Math.round(((current - previous) / previous) * 100);
	};

	const tableData = [
		{
			key: "1",
			metric: "CPU Usage",
			currentValue: latestMetrics.cpu_usage,
			peakValue: Math.max(...(data?.metrics.map(m => m.cpu_usage) || [0])),
			status: getStatus(latestMetrics.cpu_usage, "CPU Usage"),
			trend: getTrend(latestMetrics.cpu_usage, data?.metrics[data.metrics.length - 2]?.cpu_usage || 0),
			unit: "%",
		},
		{
			key: "2",
			metric: "Memory Usage",
			currentValue: latestMetrics.memory_usage,
			peakValue: Math.max(...(data?.metrics.map(m => m.memory_usage) || [0])),
			status: getStatus(latestMetrics.memory_usage, "Memory Usage"),
			trend: getTrend(latestMetrics.memory_usage, data?.metrics[data.metrics.length - 2]?.memory_usage || 0),
			unit: "%",
		},
		{
			key: "3",
			metric: "Response Time",
			currentValue: latestMetrics.response_time,
			peakValue: Math.max(...(data?.metrics.map(m => m.response_time) || [0])),
			status: getStatus(latestMetrics.response_time, "Response Time"),
			trend: getTrend(latestMetrics.response_time, data?.metrics[data.metrics.length - 2]?.response_time || 0),
			unit: "ms",
		},
		{
			key: "4",
			metric: "Error Rate",
			currentValue: latestMetrics.error_rate,
			peakValue: Math.max(...(data?.metrics.map(m => m.error_rate) || [0])),
			status: getStatus(latestMetrics.error_rate, "Error Rate"),
			trend: getTrend(latestMetrics.error_rate, data?.metrics[data.metrics.length - 2]?.error_rate || 0),
			unit: "%",
		},
	];

	if (loading) {
		return (
			<div className="p-4 flex justify-center items-center h-96">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4">
				<Alert
					message="Error"
					description={error}
					type="error"
					showIcon
				/>
			</div>
		);
	}

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
						title={`${latestMetrics.cpu_usage}%`}
						subtitle="CPU Usage"
						style={{
							color: themeVars.colors.palette.primary.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.primary.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${latestMetrics.memory_usage}%`}
						subtitle="Memory Usage"
						style={{
							color: themeVars.colors.palette.success.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${latestMetrics.response_time}ms`}
						subtitle="Response Time"
						style={{
							color: themeVars.colors.palette.warning.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
						}}
					/>
				</Col>
				<Col span={6}>
					<StatCard
						cover={glass_bag}
						title={`${(100 - latestMetrics.error_rate).toFixed(2)}%`}
						subtitle="Uptime"
						style={{
							color: themeVars.colors.palette.info.dark,
							backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel} / .2)`,
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
