import { Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";

import dashboardService, { type IntentUsageData } from "@/api/services/dashboardService";
import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

export default function IntentUsage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<IntentUsageData>({
		series: [],
		labels: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await dashboardService.getIntentUsage();
				setData(response);
			} catch (error) {
				console.error("Error fetching intent usage data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Today Intent Usage</Typography.Title>
			</header>
			<main>
				{loading ? (
					<div className="flex justify-center items-center h-[360px]">
						<Skeleton.Input active style={{ width: "100%", height: "100%" }} />
					</div>
				) : (
					<ChartDonutChart series={data.series} labels={data.labels} />
				)}
			</main>
		</Card>
	);
}

function ChartDonutChart({ series, labels }: { series: number[]; labels: string[] }) {
	const chartOptions = useChart({
		labels,
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
