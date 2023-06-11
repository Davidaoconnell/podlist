const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					...colors.emerald
				},
				complimentary: {
					...colors.red
				}
			},
			fontFamily: {
				body: ['Lato', 'sans-serif'],
				heading: ['Merriweather', 'serif']
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		// https://github.com/tailwindlabs/tailwindcss-forms#using-only-global-styles-or-only-classes
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	]
};
