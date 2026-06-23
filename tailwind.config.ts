// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fm-orange': 'hsl(26, 100%, 55%)',
        'fm-pale-orange': 'hsl(25, 100%, 94%)',
        'fm-very-dark-blue': 'hsl(220, 13%, 13%)',
        'fm-dark-grayish-blue': 'hsl(219, 9%, 45%)',
        'fm-grayish-blue': 'hsl(220, 14%, 75%)',
        'fm-light-grayish-blue': 'hsl(223, 64%, 98%)',
        'fm-black-75': 'hsl(0, 0%, 0%, 0.75)', // Para lightbox
      },
      fontFamily: {
        sans: ['var(--font-kumbh-sans)'],
      },
    },
  },
  plugins: [],
};
export default config;