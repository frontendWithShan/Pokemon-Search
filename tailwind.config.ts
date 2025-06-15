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
        primary: {
          DEFAULT: '#FF5353', 
          50: '#FFE5E5',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF5353',
          500: '#FF3333',
          600: '#E62E2E',
          700: '#CC2929',
          800: '#B32424',
          900: '#991F1F',
        },
        secondary: {
          DEFAULT: '#3B4CCA', 
          50: '#E8EAFF',
          100: '#D1D5FF',
          200: '#A3ABFF',
          300: '#7581FF',
          400: '#4757FF',
          500: '#3B4CCA',
          600: '#2F3CA5',
          700: '#232C80',
          800: '#171C5B',
          900: '#0B0C36',
        },
        
        pokemon: {
          normal: '#A8A878',
          fire: '#F08030',
          water: '#6890F0',
          electric: '#F8D030',
          grass: '#78C850',
          ice: '#98D8D8',
          fighting: '#C03028',
          poison: '#A040A0',
          ground: '#E0C068',
          flying: '#A890F0',
          psychic: '#F85888',
          bug: '#A8B820',
          rock: '#B8A038',
          ghost: '#705898',
          dragon: '#7038F8',
          dark: '#705848',
          steel: '#B8B8D0',
          fairy: '#EE99AC',
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        pokemon: ['Pokemon Solid', 'Arial Black', 'sans-serif'],
      },
      boxShadow: {
        'pokemon': '0 4px 15px 0 rgba(255, 83, 83, 0.2)',
        'pokemon-hover': '0 8px 25px 0 rgba(255, 83, 83, 0.3)',
      },
      borderRadius: {
        'pokemon': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};

export default config;