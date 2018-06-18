import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export default [
  {
    input: './src/index.js',
    output: {
      file: 'dist/dom-helpers.umd.js',
      format: 'umd',
      name: 'DomHelpers',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      babel({
        babelrc: false,
        presets: [['env', { modules: false }], 'stage-3'],
        plugins: ['external-helpers']
      }),
      sizeSnapshot()
    ]
  }
];
