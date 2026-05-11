import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      md: '850px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        workSans: ['var(--font-work-sans)', 'sans-serif'],
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
