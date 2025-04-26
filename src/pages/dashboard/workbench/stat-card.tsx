import { Skeleton } from "antd";
import type { CSSProperties } from "react";

type Props = {
	cover: string;
	subtitle: string;
	title: string;
	style?: CSSProperties;
	loading?: boolean;
};

export default function StatCard({ cover, subtitle, title, style, loading = false }: Props) {
	return (
		<div
			className="flex flex-col items-center rounded-2xl py-10"
			style={{
				...style,
			}}
		>
			<img src={cover} alt="" />
			{loading ? (
				<Skeleton.Input active size="small" style={{ width: 100, height: 30 }} />
			) : (
				<span className="text-3xl font-bold">{title}</span>
			)}
			<span className="text-sm">{subtitle}</span>
		</div>
	);
}
