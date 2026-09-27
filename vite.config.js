import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('d3') || id.includes('d3-geo')) {
              return 'vendor-charts';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@neondatabase')) {
              return 'vendor-neon';
            }
          }
          if (id.includes('src/data/realCuratedProjects') || id.includes('src/data/projectsData')) {
            return 'data-national-projects';
          }
        }
      }
    }
  }
});
