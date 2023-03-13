import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { babel } from '@rollup/plugin-babel';
import PxToViewport from 'postcss-px-to-viewport-8-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  // },
  plugins: [
    babel({
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            importSource: '@antv/f2',
          },
        ],
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        PxToViewport({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
        }),
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      host: 'localhost',
    },
  },
});
