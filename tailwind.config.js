/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ This correctly scans React components
  ],
  theme: {
    extend: {
      backgroundImage: {
        largeButtonGradient: 
          "linear-gradient(125deg, rgba(214,134,3,1) 4%, rgba(255,20,20,1) 28%, rgba(255,3,140,1) 99%)"
      }
    },
  },
  plugins: [],
};
