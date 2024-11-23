import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          '50': '#BFBFBF',
          '100': '#B5B5B5',
          '200': '#A1A1A1',
          '300': '#8C8C8C',
          '400': '#8b8b8b',
          '500': '#717171',
          '600': '#575757',
          '700': '#3f3f3f',
          '800': '#282828',
          '900': '#121212',
          '950': '#040404'
        },
        sky: {
          '50': '#C5EAF4',
          '100': '#B4E4F1',
          '200': '#92D7EA',
          '300': '#70CBE4',
          '400': '#4DBEDD',
          '500': '#2BB2D7',
          '600': '#208CAA',
          '700': '#17657B',
          '800': '#0E3E4B',
          '900': '#05171C',
          '950': '#010405'
        },
        orange: {
          '50': '#F6DBD6',
          '100': '#f4b7a5',
          '200': '#f0a590',
          '300': '#ea927b',
          '400': '#e48067',
          '500': '#dd6d53',
          '600': '#d55a3f',
          DEFAULT: '#d55a3f'
        },
        primary: {
          '50': '#F6DBD6',
          '100': '#f4b7a5',
          '200': '#f0a590',
          '300': '#ea927b',
          '400': '#e48067',
          '500': '#dd6d53',
          '600': '#d55a3f',
          DEFAULT: '#d55a3f'
        },
        green: {
          '50': '#e1f8f0',
          '100': '#b5eed8',
          '200': '#80e2c0',
          '300': '#2bd7a6',
          '400': '#00cd92',
          '500': '#00c27f',
          '600': '#00b273',
          '700': '#009f64',
          '800': '#008e57',
          '900': '#006d3f'
        },
        blue: {
          '50': '#e8ecfa',
          '100': '#c6cef3',
          '200': '#9fafec',
          '300': '#768fe4',
          '400': '#5475de',
          '500': '#2b5cd7',
          '600': '#2453cc',
          '700': '#1549c0',
          '800': '#023eb4',
          '900': '#002ba1'
        },
        purple: {
          '50': '#e8ecfa',
          '100': '#c6cef3',
          '200': '#9fafec',
          '300': '#768fe4',
          '400': '#5475de',
          '500': '#2b5cd7',
          '600': '#2453cc',
          '700': '#1549c0',
          '800': '#023eb4',
          '900': '#002ba1'
        },
        pink: {
          '50': '#fae5f4',
          '100': '#f3bce3',
          '200': '#eb8fd1',
          '300': '#e05cbf',
          '400': '#d72bb2',
          '500': '#cd00a5',
          '600': '#be00a1',
          '700': '#ac009b',
          '800': '#9b0096',
          '900': '#7d008b'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config
