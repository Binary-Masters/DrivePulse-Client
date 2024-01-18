import type { Metadata } from "next";
import Cover from "./ui/Cover";
import Goals from "./ui/Goals";
export const metadata: Metadata = {
	title: "About | DrivePulse",
	description: "This Is About Page ,It Is A File Sharing Website",
};

const Aboutpage = () => {
	return (
		<div>
			<Cover/>
			<Goals/>
		</div>
	);
};

export default Aboutpage;
