import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from "fs";

export default defineConfig({
  plugins: [
    {
      name: 'move-some',
      apply: 'build',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        fs.renameSync(resolve(distDir, 'src', 'options.html'), resolve(distDir, 'options.html'));
        fs.rmdirSync(resolve(__dirname, 'dist', 'src'));
        fs.copyFileSync(resolve(__dirname, 'manifest.json'), resolve(distDir, 'manifest.json'));
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      input: {
        // "dist/options.html": resolve(__dirname, 'src/options.html'),
        // "dist/options": resolve(__dirname, 'src/options.ts'),
        // "dist/background": resolve(__dirname, 'src/background.ts'),
        "options.html": resolve(__dirname, 'src/options.html'),
        "options": resolve(__dirname, 'src/options.ts'),
        "background": resolve(__dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',

      }
    }
  }
});
