import { Card, Row, Col, Statistic } from "antd";
import { UserOutlined, ClockCircleOutlined, FireOutlined, RiseOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";

const UserBehaviorInsights = () => {
	// Sample data for the line chart
	const data = [
		{ date: "2024-01", value: 3 },
		{ date: "2024-02", value: 4 },
		{ date: "2024-03", value: 3.5 },
		{ date: "2024-04", value: 5 },
		{ date: "2024-05", value: 4.9 },
		{ date: "2024-06", value: 6 },
	];

	const config = {
		data,
		xField: "date",
		yField: "value",
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

	return (
		<div className="p-4">
			<Row gutter={[16, 16]}>
				<Col span={6}>
					<Card>
						<Statistic title="Active Users" value={1128} prefix={<UserOutlined />} valueStyle={{ color: "#3f8600" }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Avg. Session Duration"
							value={15}
							suffix="min"
							prefix={<ClockCircleOutlined />}
							valueStyle={{ color: "#cf1322" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Engagement Rate"
							value={68.2}
							suffix="%"
							prefix={<FireOutlined />}
							valueStyle={{ color: "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Growth Rate"
							value={12.3}
							suffix="%"
							prefix={<RiseOutlined />}
							valueStyle={{ color: "#3f8600" }}
						/>
					</Card>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col span={24}>
					<Card title="User Activity Trends">
						<Line {...config} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default UserBehaviorInsights;
