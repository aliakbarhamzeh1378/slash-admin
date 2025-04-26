import { Rate, Skeleton, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import dashboardService, { type TopBrand } from "@/api/services/dashboardService";
import Card from "@/components/card";
import { Iconify } from "@/components/icon";
import Scrollbar from "@/components/scrollbar";
import { themeVars } from "@/theme/theme.css";

export default function TopBrands() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TopBrand[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await dashboardService.getTopBrands();
				setData(response);
			} catch (error) {
				console.error("Error fetching top brands data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Top Brands</Typography.Title>
			</header>
			<main className="w-full">
				<Scrollbar>
					{loading ? (
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton key={i} active avatar paragraph={{ rows: 1 }} />
							))}
						</div>
					) : (
						data.map((item) => (
							<div className="mb-4 flex" key={item.title}>
								<div
									className="mr-2 flex items-center justify-center"
									style={{
										background: `rgba(${themeVars.colors.background.defaultChannel}/ .4)`,
										borderRadius: "12px",
										width: "48px",
										height: "48px",
									}}
								>
									<Iconify icon={item.logo} size={24} />
								</div>

								<div className="flex flex-col">
									<span className="font-medium">{item.title}</span>
									<div className="flex items-center justify-center text-gray">
										{item.platform === "Mac" ? (
											<Iconify icon="wpf:mac-os" size={12} />
										) : (
											<Iconify icon="mingcute:windows-fill" size={12} />
										)}
										<span className="mx-1 text-xs font-light">{item.platform}</span>
										<Tag color={item.type === "free" ? "green" : "red"}>{item.type}</Tag>
									</div>
								</div>

								<div className="ml-auto flex flex-col self-center">
									<Rate allowHalf disabled defaultValue={item.star} />
									<span className="mt-1 text-right text-xs text-gray-400">{item.reviews}reviews</span>
								</div>
							</div>
						))
					)}
				</Scrollbar>
			</main>
		</Card>
	);
}
