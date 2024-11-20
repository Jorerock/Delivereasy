import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
// import aspectratio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms,typography
  ],
}
