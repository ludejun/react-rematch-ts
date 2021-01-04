/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const autoprefixer = require('autoprefixer');
const webpackDevServer = require('webpack-dev-server');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const projectConfig = require('../src/configs/index');

const env = {
  hot_server_host: 'localhost',
  hot_server_port: 5590,
};

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        // plugins: [['import', { libraryName: 'antd', style: 'css' }]], // `style: true` 会加载 less 文件
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      // plugins: [['import', { libraryName: 'antd', style: 'css' }]],
    },
  }, // 先解析ts和tsx，rule规则从下往上
  // {
  //   test: /\.json$/,
  //   exclude: /node_modules/,
  //   use: ['json-loader'],
  // },
  {
    test: /\.css$/,
    // exclude: /node_modules/, // Quill编辑器需要引用nodemodules中的css
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader'],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader'],
  },
];

const config = {
  resolve: {
    extensions: ['.ts', '.tsx', '.web.js', '.js', '.jsx'],
  },

  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${env.hot_server_host}:${env.hot_server_port}`,
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    // 如果配置多个entry入口，或者使用CommonsChunkPlugin这样的插件，应使用[name]占位符
    // 为了防止静态资源被缓存，将打包输出加入 文件内容hash（chunkhash）的标示
    filename: '[name].[hash].js',
    // 如有使用import()动态加载的代码打包
    chunkFilename: '[name].bundle.js',
    // publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/'
  },

  // What information should be printed to the console
  stats: {
    colors: true,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
      __MOCK: process.argv[2].indexOf('mock=true') >= 0 ? true : false,
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new HtmlWebpackPlugin({
      title: projectConfig.htmlTitle,
      inject: 'body',
      minify: false,
      template: path.join(__dirname, '../public/index.html'),
      alwaysWriteToDisk: true,
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin({ analyzerPort: 5592 }),
  ],

  // Options affecting the normal modules
  module: {
    rules: loaders,
  },

  // 可以在CLI参数中传递
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 5591,
  //   hot: true,
  //   open: true,
  // }

  // 防止将某个模块打包到bundle中，如从CDN引入react而不是将它打包
  // externals: {
  //   react: 'react',
  // },
};

// 根据命令行参数决定要不要打开： 打包模块体积分析页面
if (!process.argv[2] || process.argv[2].indexOf('bundleSize=true') >= 0) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 5592 }));
}

const options = {
  contentBase: path.join(__dirname, '../dist'),
  compress: true,
  port: env.hot_server_port,
  inline: true,
  hot: true,
  open: true,
  historyApiFallback: true,
  // publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/'
};
// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
server.listen(env.hot_server_port, env.hot_server_host, () => {
  console.log('dev server listening on port ' + env.hot_server_port);
});
