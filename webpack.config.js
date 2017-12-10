var path = require("path");
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  target: "web",
  entry: __dirname + "/src/app.tsx",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    libraryTarget: "amd"
  },
  externals: [
    {
      react: true,
      "react-dom": true
    },
    /^VSS\/.*/,
    /^TFS\/.*/,
    /^q$/
  ],
  resolve: {
    modules: [path.resolve("./src"), "node_modules"], // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          emitErrors: true,
          failOnHint: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.scss$/,
        include: path.resolve('./scss'),        
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },{
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [extractSass]
};
