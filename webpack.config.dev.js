import webpack from 'webpack';
import path from 'path';

const SRC = path.resolve(__dirname, 'src');

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    `${SRC}/index`
  ],
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: SRC
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg-xml'
      }
    ]
  }

};