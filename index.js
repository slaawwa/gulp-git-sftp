'use strict';

var cnf = require('./init/cnf.js'),
    ftp = require('./init/ftp.js'),
    git = require('./init/git.js');

module.exports = {
    ftp: ftp.init,
    git: git.deploy,
    cnf: cnf.init,
};
