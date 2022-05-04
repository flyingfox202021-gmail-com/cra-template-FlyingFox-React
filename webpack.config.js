const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].bundle.js',
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      { // If you are not using less ignore this rule
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: 'file-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules\/(?!antd\/).*/,
          name: 'vendors',
          chunks: 'all'
        },
        // This can be your own design library.
        antd: {
          test: /node_modules\/(antd\/).*/,
          name: 'antd',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ]
}