import Card from "@/components/card";
import SdkWizard from "@/components/sdk-wizard";
// import { NAV_SECTION_ITEMS, NavVertical } from "@/components/nav";
// import { ScrollArea } from "@/ui/scroll-area";

export default function BlankPage() {
	return (
		<div className="p-6">
			<SdkWizard />
		</div>
		// <Card className="w-80 h-[400px] flex flex-col justify-start">
		// 	<ScrollArea className="w-full h-full pr-2">
		// 		<NavVertical data={NAV_SECTION_ITEMS} />
		// 	</ScrollArea>
		// </Card>
	);
}
