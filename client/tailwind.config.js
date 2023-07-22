/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: ["halloween","dark", "cupcake"]
	},
	content: [
		"./src/**/*.{html,js,jsx, css}"
		// "./src/components/*.{html,js,jsx, css"
	],
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")]
};
