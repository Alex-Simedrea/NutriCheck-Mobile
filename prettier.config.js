module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
  tailwindAttributes: ['className', 'contentContainerClassName'],
  tailwindFunctions: ['clsx', 'cn'],
}