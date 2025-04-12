import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [
	{
		type: "line",
		name: "Product Deep Dive",
		data: [450, 520, 580, 620, 680, 750, 820, 890, 950, 1020, 1080, 1150],
	},
	{
		type: "line",
		name: "Product Search",
		data: [320, 380, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960],
	},
	{
		type: "line",
		name: "Product Discovery",
		data: [280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 880, 940],
	},
	{
		type: "line",
		name: "Question About Store",
		data: [150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480],
	},
	{
		type: "line",
		name: "Normal Conversation",
		data: [200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640],
	},
];

export default function IntentUsageArea() {
	const chartOptions = useChart({
		stroke: {
			width: [1, 1, 1, 1, 1],
		},
		plotOptions: {
			bar: { columnWidth: "20%" },
		},
		fill: {
			type: ["solid", "gradient", "solid"],
		},
		labels: [
			"01/01/2003",
			"02/01/2003",
			"03/01/2003",
			"04/01/2003",
			"05/01/2003",
			"06/01/2003",
			"07/01/2003",
			"08/01/2003",
			"09/01/2003",
			"10/01/2003",
			"11/01/2003",
		],
		xaxis: {
			type: "datetime",
		},
		yaxis: {
			title: { text: "Points" },
			min: 0,
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (value: number) => {
					if (typeof value !== "undefined") {
						return `${value.toFixed(0)} points`;
					}
					return value;
				},
			},
		},
	});

	return <Chart type="line" series={series} options={chartOptions} height={320} />;
}
