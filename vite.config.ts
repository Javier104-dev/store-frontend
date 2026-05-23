import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'node:path';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import istanbul from 'vite-plugin-istanbul';

import tsconfigApp from './tsconfig.app.json';

const rawAlias: Record<string, string[]> = tsconfigApp.compilerOptions.paths;
const alias: Record<string, string> = {};

for (const x in rawAlias) {
  alias[x.replace('/*', '')] = path.resolve(
    __dirname,
    rawAlias[x][0].replace('/*', ''),
  );
}

function viteConfig({ mode }: { mode: string }): UserConfig {
  process.env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    resolve: { alias },
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'playwright/**'],
        extension: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
    server: {
      host: true,
      port: process.env.PORT ? +process.env.PORT : 3000,
    },
  });
}

export default viteConfig;
