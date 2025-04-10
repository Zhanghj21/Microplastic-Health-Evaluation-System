import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Microplastic-Health-Evaluation-System/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
