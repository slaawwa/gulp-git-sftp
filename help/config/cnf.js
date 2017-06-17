var argv = require('yargs').argv;

/**
 * @description             [Now you can use `gulp deploy --dephost=prod`]
 * @param  {String}         [deployHost - prod or preprod or something else]
 * @return {Object}         [Object with default config]
 */
var defCNF = (function(deployHost) {
    var props = {
        host: '-',
        pass: '-',
        remotePath: '/',
        basePath: '.',
    };
    switch (deployHost) {
        case 'prod': {
            props.user = '-';
        } break;
        // preprod
        case 'preprod':
        default: {
            props.user = '-';
        }
    }
    return props;
})(argv.dephost);

var CNF = {
    user: argv.user || defCNF.user,
    pass: argv.pass || defCNF.pass,
    host: argv.host || defCNF.host,
    remotePath: argv.remotePath || defCNF.remotePath,
    basePath: argv.basePath || defCNF.basePath,
};

module.exports = CNF;
