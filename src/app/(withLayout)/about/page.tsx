import type { Metadata } from "next";
import Cover from "../../../Components/About/Cover";
import Goals from "../../../Components/About/Goals";
import Team from "../../../Components/About/Team";
export const metadata: Metadata = {
	title: "About | DrivePulse",
	description: "This Is About Page ,It Is A File Sharing Website",
};

const Aboutpage = () => {
	return (
		<div>
			<Cover/>
			<Goals/>
			<Team/>
		</div>
	);
};

export default Aboutpage;
