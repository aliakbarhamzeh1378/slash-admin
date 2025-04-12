import { Select, Typography } from "antd";
import { useState } from "react";

import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

export default function IntentUsageArea() {
	const [year, setYear] = useState("2022");
	const series: Record<string, ApexAxisChartSeries> = {
		"2022": [
			{
				name: "Product Deep Dive",
				data: [450, 520, 580, 620, 680, 750, 820, 890, 950, 1020, 1080, 1150],
			},
			{
				name: "Product Search",
				data: [320, 380, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960],
			},
			{
				name: "Product Discovery",
				data: [280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 880, 940],
			},
			{
				name: "Question About Store",
				data: [150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480],
			},
			{
				name: "Normal Conversation",
				data: [200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640],
			},
		],
	};
	return (
		<Card className="flex-col">
			<header className="flex w-full justify-between self-start">
				<Typography.Title level={5}>Intent Usage Statistics</Typography.Title>
				<Select
					size="small"
					defaultValue={year}
					onChange={(value) => setYear(value)}
					options={[{ value: 2022, label: "2022" }]}
				/>
			</header>
			<main className="w-full">
				<ChartArea series={series[year]} />
			</main>
		</Card>
	);
}

function ChartArea({ series }: { series: ApexAxisChartSeries }) {
	const chartOptions = useChart({
		xaxis: {
			type: "category",
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		},
		tooltip: {
			y: {
				formatter: (value) => `${value} requests`,
			},
		},
		legend: {
			position: "top",
		},
	});

	return <Chart type="area" series={series} options={chartOptions} height={300} />;
}
