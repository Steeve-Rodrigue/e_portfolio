import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        vietnam: ['var(--font-vietnam)', 'sans-serif'],
      },
      colors: {
        mint: '#E0F5F0',
        'mint-base': '#F7FAF9',
        'neutral-mist': '#F9FCFB',
        orange: '#FF7E47',
        slate: '#2D3648',
        teal: '#4F625F',
        mist: '#727876',
        rust: '#A53C05',
      },
    },
  },
  plugins: [],
}
export default config
