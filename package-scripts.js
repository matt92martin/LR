const npsUtils = require('nps-utils')

module.exports = {
    scripts: {
        default: npsUtils.concurrent.nps('start', 'dev'),
        start: 'node server.js',
        dev: 'webpack-dev-server --env=dev',
        build: {
            default: 'webpack',
            prod: 'webpack -p',
        },
    },
}