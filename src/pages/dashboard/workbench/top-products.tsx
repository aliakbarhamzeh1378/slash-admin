import { Space, Tag, Typography } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import dashboardService, { type TopProduct } from "@/api/services/dashboardService";
import Card from "@/components/card";
import { IconButton, Iconify } from "@/components/icon";
import Scrollbar from "@/components/scrollbar";

export default function TopProducts() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<TopProduct[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await dashboardService.getTopProducts();
				setData(response);
			} catch (error) {
				console.error("Error fetching top products data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const columns: ColumnsType<TopProduct> = [
		{
			title: "InvoiceId",
			dataIndex: "id",
			key: "id",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (_status) => {
				const status = _status as string;
				let color = "success";
				if (status === "Progress") color = "gold";
				if (status === "Out of Date") color = "red";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Space size="middle">
					<IconButton>
						<Iconify icon="fontisto:more-v-a" />
					</IconButton>
				</Space>
			),
		},
	];

	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Top Products</Typography.Title>
			</header>
			<main className="w-full">
				<Scrollbar>
					<Table columns={columns} dataSource={data} loading={loading} />
				</Scrollbar>
			</main>
		</Card>
	);
}
