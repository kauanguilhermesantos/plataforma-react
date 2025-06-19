import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			neutral: {
				100: "#D3D3D3"
			},
			"cinza-claro": "#D3D3D3"
  			// background: 'var(--background)',
  			// foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
//   plugins: [require("tailwindcss-animate")],
};
export default config;

// Cinza claro (#D3D3D3): neutralidade e ausência de viés

// Bege suave (#F5F5DC): acolhimento e equilíbrio

// Azul acinzentado (#A9B0B3): serenidade com leveza

// Verde menta claro (#D0F0C0): sensação de frescor e abertura

// Branco puro (#FFFFFF): pureza e possibilidade de adaptação