import typescript from 'rollup-plugin-typescript';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export default {
  input: './src/index.js',
  output: {
    file: './lib/dist/dom-helpers.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    sizeSnapshot()
  ]
}
