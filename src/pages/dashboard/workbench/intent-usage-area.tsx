import { Select, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";

import dashboardService, { type IntentUsageAreaData } from "@/api/services/dashboardService";
import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

export default function IntentUsageArea() {
	const [year, setYear] = useState("2022");
	const [loading, setLoading] = useState(true);
	const [series, setSeries] = useState<IntentUsageAreaData>({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await dashboardService.getIntentUsageArea();
				setSeries(data);
			} catch (error) {
				console.error("Error fetching intent usage area data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
				{loading ? (
					<div className="flex justify-center items-center h-[300px]">
						<Skeleton.Input active style={{ width: "100%", height: "100%" }} />
					</div>
				) : (
					<ChartArea series={series[year] || []} />
				)}
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
