import type { Metadata } from "next";
import Cover from "./ui/Cover";
export const metadata: Metadata = {
	title: "About | DrivePulse",
	description: "This Is About Page ,It Is A File Sharing Website",
};

const Aboutpage = () => {
	return (
		<div>
			<Cover/>
		</div>
	);
};

export default Aboutpage;
