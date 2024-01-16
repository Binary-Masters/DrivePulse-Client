import type { Metadata } from "next";
import Benefits from "@/Components/ui/BenefitsUS/Benefits";
export const metadata: Metadata = {
  title: "Home | DrivePulse",
  description: "This Is Home Page ,It Is A File Sharing Website",
};

export default function Home() {
  return (
    <>
     <Benefits/>
    </>
  );
}
