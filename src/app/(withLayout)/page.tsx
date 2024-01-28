import type { Metadata } from "next";
import Benefits from "@/Components/Home/BenefitsUS/Benefits";
import Banner from "@/Components/Home/Banner/Banner";
import HandleFileNeed from "@/Components/Home/HandleFileNeeds/HandleFileNeed";
import HostedInfo from "@/Components/Home/HostedInfo/HostedInfo";
import HomeAbout from "@/Components/Home/HomeAbout/HomeAbout";
import FAQ from "@/Components/Home/FAQ/FAQ";
import SignUpToFree from "@/Components/Home/SignUptoFree/SignUpToFree";
export const metadata: Metadata = {
  title: "Home | DrivePulse",
  description: "This Is Home Page ,It Is A File Sharing Website",
};

export default function Home() {
  return (
   
    <>
      <Banner />
      <HostedInfo/>
      <HomeAbout/>
      <Benefits />
      <HandleFileNeed/>
      <SignUpToFree/>
      <FAQ/>
    </>
  );
}
