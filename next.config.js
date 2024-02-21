/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/dashboard/files",
				destination: "/dashboard/files/root",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
