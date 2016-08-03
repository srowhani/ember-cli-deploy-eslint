;(function (Base, Promise, exec) {
  'use strict'

  module.exports = {
    name: 'ember-cli-deploy-eslint',
    createDeployPlugin: function (options) {
      var Plugin = Base.extend({
        name: options.name,
        willBuild: function (context) {
          var config = context.config[this.name] || {}
          var directories = config.directories instanceof Array ?
            directories.join(' ') : '.'
          var cmd = './node_modules/eslint/bin/eslint.js *.js ' + directories
          return new Promise(function (resolve, reject) {
            exec(cmd, function (error, out) {
              error ? reject(out) : resolve(out)
            })
          })
        }
      })
      return new Plugin
    }
  }
})
(
  require('ember-cli-deploy-plugin'),
  require('ember-cli/lib/ext/promise'),
  require('child_process').exec
)
