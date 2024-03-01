/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-1": "linear-gradient(118deg, #0E1642  -3.62%, #1FA2FF 50.44%, #0052D4 104.51%)",
				"gradient-2":
					"linear-gradient(124deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%)",
				"gradient-3":
					"linear-gradient(118deg, #9CECFB -9.12%, #65C7F7 48.59%, #0052D4 106.3%)",
				"gradient-5":
					"linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
			},
			colors: {
				primary: "#16aae0",
				"custom-blue-1": "#0e1642",
			},
		},
	},

	plugins: [require("daisyui")],
};
