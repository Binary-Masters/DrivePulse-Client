import type { Metadata } from "next";
import Aboutimg from "../../../assests/images/about.jpg"
import Goals from "../../../Components/About/Goals";
import Team from "../../../Components/About/Team";
import PageCover from "@/Components/Shared/PageCover/PageCover";
export const metadata: Metadata = {
	title: "About | DrivePulse",
	description: "This Is About Page ,It Is A File Sharing Website",
};

const Aboutpage = () => {
	return (
		<div className="gradient2-bg">
			<PageCover img={Aboutimg} text={"About Us"}/>
			<Goals/>
			<Team/>
		</div>
	);
};

export default Aboutpage;
