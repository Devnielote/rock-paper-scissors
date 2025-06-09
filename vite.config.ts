// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // raíz del proyecto (puede cambiarse si usas una carpeta /public o /app)
  build: {
    outDir: 'dist',
  }
})

