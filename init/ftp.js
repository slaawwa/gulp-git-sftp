var ftp = require('vinyl-ftp')/*,
    argv = require('yargs').argv,
    CNF = require('./cnf')*/;

/** Configuration **/
/*var user = process.env.FTP_USER,
    password = process.env.FTP_PWD,
    host = CNF.host,
    remotePath = CNF.remotePath,
    basePath = CNF.basePath;*/

function getFtpConnection(conf) {
    conf = conf || {};
    return ftp.create({
        host: conf.host/* || host*/,
        user: conf.user/* || user*/,
        password: conf.pass/* || password*/,
        port: 21,
        parallel: 10
    });
}

module.exports = {
    init: function(CNF) {
        return {
            conn: getFtpConnection,
            remotePath: CNF.remotePath || remotePath,
            basePath: CNF.basePath || basePath,
            _file2format: function(files) {
                var resFiles = {
                    add: [],
                    del: [],
                    delDir: [],
                }
                
                for (var i in files) {
                    files[i] = files[i].split(':');
                    if (files[i].length < 2) {
                        files[i][1] = files[i][0];
                        files[i][0] = 'new';
                    }
                    if (files[i][0] == 'delDir' || files[i][0] == 'deldir') {
                        resFiles.delDir.push(files[i][1]);
                    } else if (files[i][0] == 'del' || files[i][0] == 'deleted' || files[i][0] == 'delete' ) {
                        resFiles.del.push(files[i][1]);
                    } else {
                        resFiles.add.push(files[i][1]);
                    }
                }
                return resFiles;
            }
        }
    },
};
