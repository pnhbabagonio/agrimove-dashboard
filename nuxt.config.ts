// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    'leaflet/dist/leaflet.css',
    '@/assets/css/input.css',
  ],
   // you'll have to create this file
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});