const { merloui } = require('merlo-ui/plugin')
const { colors } = require('./src/constants')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/merlo-ui/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: { colors },
  },
  darkMode: 'class',
  plugins: [merloui()],
}
