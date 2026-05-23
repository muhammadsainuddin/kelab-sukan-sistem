import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Kelab Sukan PERHILITAN',
        short_name: 'Kelab PERHILITAN',
        description: 'Sistem Keahlian, Sukan & Kebajikan Kelab Sukan PERHILITAN',
        theme_color: '#0F4C3A',
        background_color: '#FDFDFD',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'launchericon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'launchericon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'launchericon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'launchericon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'launchericon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'launchericon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Sangat penting untuk Android (Adaptive Icons)
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,vue}']
      }
    })
  ],
})