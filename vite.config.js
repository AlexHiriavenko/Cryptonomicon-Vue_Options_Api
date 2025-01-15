import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base:
    process.env.NODE_ENV === 'production'
      ? '/Cryptonomicon-Vue_Options_Api/'
      : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
});
