/* eslint-disable */
var path = require('path');
var config = require('yargs').argv;
var plugins = require('./webpack/plugins');
var output = require('./webpack/output');
var loaders = require('./webpack/loaders');

var env = config.env;
process.traceDeprecation = true

const util = require('util');
console.log(util.inspect(env, {showHidden: false, depth: null}));
console.log('\nLet\'s check webpack config.\n');
switch (env.type) {
  case 'vendors':	  
    var pluginsArr = [
      plugins.definePlugin(env),
      plugins.uglifyJsPlugin(env),
      // plugins.dedupePlugin(config),
      plugins.occurrenceOrderPlugin(env),
      plugins.dllPlugin(env),
      //plugins.fixModuleIdAndChunkIdPlugin(),
      plugins.statsWriterPlugin(env),
    ].filter(function(plugin) { return typeof plugin !== 'undefined'; });    
    module.exports = {
      entry: { main: require('./packages/vendors-dashboard-worona/vendors.json') },
      output: output.vendors(env),
      plugins: pluginsArr,
    };
    break;

  case 'core': // Extensions and Themes.
    var pluginsArr = [
      plugins.definePlugin(env),
      plugins.dllReferencePlugin(env),
      plugins.lodashModuleReplacementPlugin(env),
      plugins.contextReplacementPlugin(),
      plugins.htmlWebpackPlugin(env),
    ].filter(function(plugin) { return typeof plugin !== 'undefined'; });
    var loadersArr = [
      loaders.bundle(env),
      loaders.babel(env),
      loaders.css(env),
      loaders.sass(env),
      loaders.image(env),
      loaders.font(env),
      loaders.locale(env),
      loaders.json(env),
    ].filter(function(loader) { return typeof loader !== 'undefined'; });
    module.exports = {
      entry: { main: [
        'script-loader!systemjs/dist/system.js',
        './development/entry.js',
        './packages/' + env.name + '/src/' + env.entrie + '/index.js',
      ] },
      output: output.core(env),
      module: { loaders: loadersArr },
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
          'node_modules',
          'packages/vendors-dashboard-worona/node_modules',
        ],
        alias: {
        	'lodash/object/omit': 'lodash/omit',
        	'lodash/object/extend': 'lodash/extend',
        	'lodash/lang/isObject': 'lodash/isObject',
        	'lodash/lang/isEqual': 'lodash/isEqual',
        	'lodash/collection/forEach': 'lodash/forEach',
        	'lodash/collection/each': 'lodash/each',
        	'lodash/collection/pluck': 'lodash/map',
        	'lodash/object/keys': 'lodash/keys',
        },
      },
      // devtool: '#eval-source-map',
      devServer: {
    		contentBase: 'dist',
    		noInfo: false,
    		inline: true,
        port: 4000,
        host: "0.0.0.0",
        historyApiFallback: true,
    	},
      // postcss: function() { return [require('postcss-cssnext')()]; },
      stats: { children: false },
      plugins: pluginsArr,
    };
    break;
}
