---
layout: post
title: Boilerplate для Webpack 4
date: 2020-05-05 13:45:33 +0500
category: Разработка
tags: ['Web']
---

# Boilerplate для Webpack 4.

Для связки Vue + Less.
2 конфига:
- Для разработки с hot reload и запуском dev server.
- Для создание рабочего бандла с минификацией.

## Install

```shell
npm install --save-dev webpack webpack-dev-server webpack-cli html-webpack-plugin vue-loader file-loader style-loader css-loader vue-style-loader less-loader mini-css-extract-plugin
 optimize-css-assets-webpack-plugin @babel/core @babel/cli @babel/preset-env browserslist cssnano
```

## webpack.dev.js

Опция **cheap-module-eval-source-map** - Similar to eval-cheap-source-map, however, in this case Source Maps from Loaders are processed for better results. However Loader Source Maps are simplified to a single mapping per line.

```js
'use strict';

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  cache: true,
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "file-loader?name=[name].[hash].[ext]",
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: "file-loader?name=[name].[ext]?[hash]",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    host: "127.0.0.1",
    open: true,
    inline: true,
    hot: true,
    noInfo: false,
    quiet: false,
    stats: "errors-only",
  },
  devtool: "#cheap-module-eval-source-map",
};  
```

## webpack.prod.js


```js
'use strict';

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  cache: true,
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
  mode: "production",
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          name: "/images/[name].[hash].[ext]",
          limit: "8192",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: "file-loader?name=[name].[ext]?[hash]",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css",
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
};
```

## babel.config.json

Конфиг Babel, чтобы он транспилировал код в поддерживаемый 
для заданных в browserslist браузеров.

```json
{
    "presets": [
        "@babel/env"
    ]
}
```

## .browserslistrc

Конфиг browserslist. 
```
    last 2 versions,
    > 0.25%,
    not ie <= 11,
    not dead
```

## package.json

В скрипты package.json добавить.

```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --config webpack.dev.js"
  }
}
```
