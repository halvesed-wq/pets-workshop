// @ts-check
process.env.ASTRO_TELEMETRY_DISABLED = '1';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import fs from 'node:fs';
import path from 'node:path';

// Allow Vite to serve files from the real node_modules path when it is symlinked
const nodeModulesPath = path.resolve('node_modules');
const realNodeModulesPath = fs.realpathSync(nodeModulesPath);
const fsAllow = ['..'];
if (realNodeModulesPath !== nodeModulesPath) {
  fsAllow.push(path.dirname(realNodeModulesPath));
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: fsAllow,
      },
    },
  },
  adapter: node({
    mode: 'standalone'
  }),
});