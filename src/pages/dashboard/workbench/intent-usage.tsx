import { Typography } from "antd";

import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

export default function IntentUsage() {
	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Today Intent Usage</Typography.Title>
			</header>
			<main>
				<ChartDonutChart />
			</main>
		</Card>
	);
}

const series = [44, 55, 13, 43, 22];
function ChartDonutChart() {
	const chartOptions = useChart({
		labels: ["Product Deep Dive", "Product Search", "Product Discovery", "Question About Store", "Normal Conversation"],
		stroke: {
			show: false,
		},
		legend: {
			position: "bottom",
			horizontalAlign: "center",
		},
		tooltip: {
			fillSeriesColor: false,
		},
		chart: {
			width: 240,
		},
		plotOptions: {
			pie: {
				donut: {
					size: "90%",
					labels: {
						total: {
							fontSize: "12px",
						},
						value: {
							fontSize: "18px",
							fontWeight: 700,
						},
					},
				},
				expandOnClick: false,
			},
		},
	});

	return <Chart type="donut" series={series} options={chartOptions} height={360} />;
}
