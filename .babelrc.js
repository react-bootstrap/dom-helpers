module.exports = (api) => ({
  presets: ['@react-bootstrap', '@babel/typescript'],
  plugins: [
    api.env() === 'esm' && ['babel-plugin-add-import-extension', { 'extension': 'js' }],
  ].filter(Boolean),
});
