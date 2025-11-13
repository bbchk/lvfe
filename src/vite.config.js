import { defineConfig } from 'vite'

import { resolve } from 'path';

import react from '@vitejs/plugin-react'
// console.log("HELLO:" + resolve(__dirname, '../public'))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './'),
      'comps': resolve(__dirname, './components'),
      'features': resolve(__dirname, './features'),
      'hooks': resolve(__dirname, './hooks'),
      'store': resolve(__dirname, './store'),
      'styles': resolve(__dirname, './styles'),
      'utils': resolve(__dirname, './utils'),
      'pages': resolve(__dirname, './pages'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/_variables.scss" as *; @use "styles/_mixins.scss" as *;`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  // root: 'src',
  publicDir: resolve(__dirname, '../public'),
  // envDir: __dirname,
  // plugins: [Inspect()],
  base: '/',
  build: {
    outDir: resolve(__dirname, '../dist'),
    sourcemap: true,
    // emptyOutDir: true
    minify: true,
  },
  esbuild: {
    // minify: true,
    sourcemap: true,
  },
  //TODO?: What's this?
  define: {
    'process.env': process.env
  }
})
