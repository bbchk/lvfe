import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './'),
      'comps': path.resolve(__dirname, './components'),
      'features': path.resolve(__dirname, './features'),
      'hooks': path.resolve(__dirname, './hooks'),
      'store': path.resolve(__dirname, './store'),
      'styles': path.resolve(__dirname, './styles'),
      'utils': path.resolve(__dirname, './utils'),
      'pages': path.resolve(__dirname, './pages'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/_variables.scss" as *; @use "src/styles/_mixins.scss" as *;`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  // root: 'src',
  // publicDir: resolve(__dirname, './assets/public'),
  // envDir: __dirname,
  // plugins: [Inspect()],
  base: '/',
  build: {
    outDir: path.resolve(__dirname, './dist'),
    sourcemap: true,
    // emptyOutDir: true
    minify: true,
  },
  esbuild: {
    // minify: true,
    sourcemap: true,
  },
  define: {
    'process.env': process.env
  }
})
