const nodeExternals = require('webpack-node-externals');
const glob = require("glob");
const path = require('path');

function generateEntry(paths) {
  let config = {};
  paths.forEach(file => {
    const pathObj = path.parse(file);
    const entryName = pathObj.name;
    config[entryName] = [file];
  });
  return config;
}


const entries = generateEntry(glob.sync("./functions/*.js"));

module.exports = {
  entry: entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
          'eslint-loader'
        ],
        include: __dirname,
        exclude: /(node_modules|.webpack)/,
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};
