import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './lib/dist/dom-helpers.js',
    format: 'esm',
  },
  plugins: [
    typescript(),
    sizeSnapshot(),
  ],
}
