import { Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

import dashboardService, { type TopInstalledCountry } from "@/api/services/dashboardService";
import Card from "@/components/card";

// Using a more detailed and reliable TopoJSON source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function TopUserCountry() {
	const [tooltipContent, setTooltipContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TopInstalledCountry[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await dashboardService.getTopInstalledCountries();
				setData(response);
			} catch (error) {
				console.error("Error fetching top installed countries data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Card className="flex-col w-full">
			<header className="self-start mb-4">
				<Typography.Title level={5}>Top Installed Countries</Typography.Title>
			</header>
			<main className="w-full h-[600px]">
				{loading ? (
					<div className="flex justify-center items-center h-full">
						<Skeleton.Input active style={{ width: "100%", height: "100%" }} />
					</div>
				) : (
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
						{data.map(({ country, coordinates, android, windows, ios }) => (
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
				)}
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
