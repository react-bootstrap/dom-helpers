const { BABEL_ENV, NODE_ENV } = process.env

const modules = BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false
const loose = true

module.exports = {
  presets: [
  	['env', { modules, loose }],
  	'stage-3'
  ],
  plugins: [
  	modules === 'commonjs' && 'add-module-exports',
  ].filter(Boolean)
}
