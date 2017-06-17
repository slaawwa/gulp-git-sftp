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

/*

 - config/cnf.js
 - .gitignore

    config/cnf.js

 - gulpfile.js

    var gss = require('gulp-git-sftp'),
        cnf = gss.cnf(require('./config/cnf.js')),
        CNF = ggs.cnf(cnf),
        FTP = ggs.ftp(CNF);

    var conn = FTP.conn({
        user: argv.user || CNF.user,
        pass: argv.pass || CNF.pass,
        host: argv.host || CNF.host,
    });

 - COSOLE: npm i yargs -D

*/
