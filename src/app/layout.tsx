import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrivePulse",
  description: "This Is A File Sharing Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Navbar/>
        <hr />
       <div className="min-h-screen">
       {children}
       </div>
        <Footer/>
      </body>
    </html>
  );
}
