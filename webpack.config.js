var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var Dotenv = require('dotenv-webpack');
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry: './src/server.js',
    output: {
        filename: "server.min.js",
        path: path.resolve(__dirname, "./dist/js")
    },
    target: 'node',
    externals: nodeModules,
    plugins: [
        new Dotenv()
      ]
}
