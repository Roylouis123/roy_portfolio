import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Optimize bundling and loading
  build: {
    // Generate smaller chunks
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Optimize dependencies
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'ui': ['lucide-react', '@fortawesome/react-fontawesome'],
        },
      },
    },
  },
  
  // Development server settings
  server: {
    hmr: { overlay: false }, // Less intrusive HMR
  },
  
  // Optimize prefetching
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})