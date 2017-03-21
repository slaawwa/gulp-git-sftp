var gulp = require('gulp'),
    git = require('gulp-git');

var GIT = {
    getFiles: function(cb, unsort) {
        git.status({args: ''}, function (err, stdout) {
            if (err) throw err;
            var a = stdout.indexOf('to unstage)');
            if (a == -1) {
                cb('to unstage(')
                return;
            }
            var gitFiles = stdout.substring(a+12);
            gitFiles = gitFiles.substring(0, gitFiles.indexOf('\n\n'))
                .replace(/\n\s+/g, '\n').trim().split('\n');
            
            var resFiles = {
                add: [],
                del: [],
            }
            for (var i in gitFiles) {
                gitFiles[i] = gitFiles[i].split(':   ');
                gitFiles[i][1] = gitFiles[i][1].trim();
                
                if (!unsort) {
                    if (gitFiles[i][0] != 'deleted') {
                        resFiles.add.push(gitFiles[i][1]);
                    } else {
                        resFiles.del.push(gitFiles[i][1]);
                    }
                }
            }
            if (cb) cb(null, unsort? gitFiles: resFiles);
        });
    },
    deployFiles: function(opt, cb) {
        if (opt.addFiles && opt.addFiles.length) {
            console.log('basePath:', opt.basePath)
            console.log('addFiles:', opt.addFiles)
            gulp.src( opt.addFiles, { base: opt.basePath, buffer: false } )
                .pipe( opt.conn.newer( opt.remotePath || argv.remotePath ) ) // only upload newer files 
                .pipe( opt.conn.dest( opt.remotePath || argv.remotePath ) );
            console.log('ADD:', opt.addFiles);
        }
        if (opt.delFiles && opt.delFiles.length) {
            for (var i in opt.delFiles) {
                opt.conn.delete(opt.remotePath+opt.delFiles[i], function(e) {
                    console.log('DELETED:', opt.delFiles[i]);
                });
            }
        }
        if (opt.delDir && opt.delDir.length) {
            for (var i in opt.delDir) {
                opt.conn.rmdir(opt.remotePath+opt.delDir[i], function(e) {
                    console.log('DELETED DIR:', opt.delDir[i]);
                });
            }
        }
        cb(null, 'done');
    }
};
module.exports = {
    
    getFiles: GIT.getFiles,
    
    deployFiles: GIT.deployFiles,
    
    deploy: function(opt, cb) {
        var fn = function(err, files) {
            if (err) console.log('ERRROR', err);
            
            if (!files) {
                console.log('ERROR: Files is undefined!');
                return;
            }

            opt.addFiles = files.add;
            opt.delFiles = files.del;
            opt.delDir = files.delDir;

            if (!cb(null, opt)) return;

            GIT.deployFiles(opt, function(err) {
                if (err) console.log('ERRROR2:', err);
                console.log('Files from git to FTP is deployed!!!')
            });
        }
        if (opt.files) {
            fn(null, opt.files);
        } else {
            GIT.getFiles(fn, false);
        }
    },
    
}
