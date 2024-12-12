import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/WebviewApp.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react'],
  injectStyle: true,
});
