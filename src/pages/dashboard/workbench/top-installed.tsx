import { Typography } from "antd";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

import Card from "@/components/card";

// Using a more detailed and reliable TopoJSON source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
	country: string;
	coordinates: [number, number];
	android: string;
	windows: string;
	ios: string;
}

const dataSource: CountryData[] = [
	{
		country: "Germany",
		coordinates: [10.4515, 51.1657],
		android: "9.91k",
		windows: "1.95k",
		ios: "1.95k",
	},
	{
		country: "China",
		coordinates: [104.1954, 35.8617],
		android: "1.95k",
		windows: "9.25k",
		ios: "7.95k",
	},
	{
		country: "Australia",
		coordinates: [133.7751, -25.2744],
		android: "3.91k",
		windows: "2.95k",
		ios: "4.95k",
	},
	{
		country: "France",
		coordinates: [2.3522, 48.8566],
		android: "3.28k",
		windows: "2.29k",
		ios: "8.95k",
	},
	{
		country: "USA",
		coordinates: [-95.7129, 37.0902],
		android: "8.81k",
		windows: "7.05k",
		ios: "4.35k",
	},
];

export default function TopUserCountry() {
	const [tooltipContent, setTooltipContent] = useState("");

	return (
		<Card className="flex-col w-full">
			<header className="self-start mb-4">
				<Typography.Title level={5}>Top Installed Countries</Typography.Title>
			</header>
			<main className="w-full h-[600px]">
				<ComposableMap
					projection="geoEqualEarth"
					projectionConfig={{
						scale: 170,
						center: [0, 0],
					}}
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.id}
									geography={geo}
									fill="#E4E5E9"
									stroke="#D6D6DA"
									strokeWidth={0.5}
									style={{
										default: {
											outline: "none",
											transition: "all 250ms",
										},
										hover: {
											fill: "#F5F4F6",
											outline: "none",
											transition: "all 250ms",
										},
										pressed: {
											outline: "none",
										},
									}}
								/>
							))
						}
					</Geographies>
					{dataSource.map(({ country, coordinates, android, windows, ios }) => (
						<Marker
							key={country}
							coordinates={coordinates}
							data-tooltip-id="country-tooltip"
							onMouseEnter={() => {
								setTooltipContent(`${country}\n• Android: ${android}\n• Windows: ${windows}\n• iOS: ${ios}`);
							}}
							onMouseLeave={() => {
								setTooltipContent("");
							}}
						>
							<g transform="translate(-12, -24)">
								<path
									d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
									fill="#F53"
									fillRule="evenodd"
									stroke="#FFF"
									strokeWidth="1"
								/>
							</g>
						</Marker>
					))}
				</ComposableMap>
				<Tooltip
					id="country-tooltip"
					style={{
						backgroundColor: "#333",
						color: "#fff",
						padding: "8px 12px",
						borderRadius: "4px",
						fontSize: "14px",
						lineHeight: "1.5",
						whiteSpace: "pre-line",
					}}
				>
					{tooltipContent}
				</Tooltip>
			</main>
		</Card>
	);
}
