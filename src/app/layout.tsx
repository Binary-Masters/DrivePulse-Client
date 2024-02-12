// RootLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode
import "./globals.css";

// Providers
import ReactTanstackProvider from "../providers/ReactTanstackProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DrivePulse",
	description: "This Is A File Sharing Website",
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<ReactTanstackProvider>
			<html lang="en" data-theme="light">
				<body className={inter.className}>
					<div className="min-h-screen">
							<AuthProvider>{children}</AuthProvider>
					</div>
				</body>
			</html>
		</ReactTanstackProvider>
	);
}
