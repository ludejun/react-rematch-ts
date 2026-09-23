/**
 * NODE_ENV is set by the scripts in package.json: 'prod' for the production
 * build, and the dev server's own value otherwise.
 */
module.exports = function babelConfig(api) {
  const isProduction = process.env.NODE_ENV === 'prod';
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript'
    ],
    plugins: [
      // Babel 8 renamed this option from `legacy: true` to `version: 'legacy'`.
      ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      ['@babel/plugin-transform-runtime', { corejs: 3 }],
      // Fast Refresh only belongs in the dev server; including it here
      // unconditionally shipped the refresh runtime in production builds.
      ...(isProduction ? [] : ['react-refresh/babel'])
    ]
  };
};
