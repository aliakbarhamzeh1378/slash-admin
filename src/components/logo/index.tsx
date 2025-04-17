import LogoImage from "@/assets/images/logo.png";
import { useTheme } from "@/theme/hooks";
import { NavLink } from "react-router";

interface Props {
	size?: number | string;
}

function Logo({ size = 50 }: Props) {
	const { themeTokens } = useTheme();

	return (
		<NavLink to="/">
			<img
				src={LogoImage}
				alt="Logo"
				style={{
					width: size,
					height: size,
					objectFit: "contain",
					filter: `drop-shadow(0 0 2px ${themeTokens.color.palette.primary.default})`,
				}}
			/>
		</NavLink>
	);
}

export default Logo;
