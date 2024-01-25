import type { Metadata } from "next";
import Benefits from "@/Components/Home/BenefitsUS/Benefits";
import Banner from "@/Components/Home/Banner/Banner";
import HandleFileNeed from "@/Components/Home/HandleFileNeeds/HandleFileNeed";
import {useRouter} from "next/navigation";
import useAuth from "@/Hooks/useAuth";
export const metadata: Metadata = {
	title: "Home | DrivePulse",
	description: "This Is Home Page ,It Is A File Sharing Website",
};

export default function Home() {
	return (
		<>
			<Banner />
			<Benefits />
			<HandleFileNeed />
		</>
	);
}
