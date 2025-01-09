const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
require('@babel/polyfill')

module.exports = (env, opts) => {
  const config = {
    resolve: {
      extensions: ['.vue', '.js'] // 확장자로 명시한 것들을 생략하겠다 라는 의미
    },
    // 진입점
    entry: {
      app: [
        '@babel/polyfill',
        path.join(__dirname, 'main.js')
      ]
    },
    // 결과물에 대한 설정
    output: {
      filename: 'app.js',
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets/',
            to: '' // 대상 폴더를 지정하지 않으면 'dist/assets/'로 복사됨
          }
        ]
      })
    ]
  }

  // 개발용
  if (opts.mode === 'development') {
    return merge(config, {
      // 추가 개발용 옵션
      devtool: 'eval',
      devServer: {
        open: false,
        hot: true
      }
    })

    // 제품용
  } else {
    return merge(config, {
      // 추가 제품용 옵션
      devtool: 'cheap-module-source-map',
      plugins: [
        new CleanWebpackPlugin() // dist 디렉토리를 지우고 새로 세팅하는 역할, devServer 와 동일한 역할이므로 제품용으로만 사용
      ]
    })
  }
}
