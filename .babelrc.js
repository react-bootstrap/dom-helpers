module.exports = (api) => {
  return {
    presets: [
      '@react-bootstrap',
      [
        '@babel/typescript',
        {
          rewriteImportExtensions: api.env() !== 'development',
        },
      ],
    ],
  };
};
