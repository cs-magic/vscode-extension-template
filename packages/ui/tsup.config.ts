import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.tsx',
    styles: 'src/styles.css'
  },
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      composite: false,
      declaration: true,
      declarationMap: true,
      emitDeclarationOnly: false
    }
  },
  external: ['react'],
  sourcemap: true,
  clean: true,
  treeshake: true,
})
