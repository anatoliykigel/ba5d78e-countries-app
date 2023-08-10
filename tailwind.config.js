/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  theme: {
    screens: {
      sm: '768px',
      md: '1200px',
      lg: '1400px'
    },
    container: {
      center: true
    },
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
