import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Flat project layout (all source files in the repo root).
// `npm run build` -> dist/ (served by Cloudflare, see wrangler.jsonc)
export default defineConfig(({ mode }) => ({
  base: './',
  publicDir: false,
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    assetsInlineLimit: mode === 'single' ? 100000000 : 4096,
    rollupOptions: { input: 'index.html' },
  },
}))
