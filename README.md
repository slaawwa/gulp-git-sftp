
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/gulp-git-sftp
[downloads-image]: https://img.shields.io/npm/dm/gulp-git-sftp.svg
[npm-image]: https://img.shields.io/npm/v/gulp-git-sftp.svg

## Install `gulp-git-sftp` with `--save-dev`

```bash
npm i gulp-git-sftp -D
```

## What is gulp-git-sftp?

- **gulp** - gulp...
- **git** - git...
- **sftp** - sftp...
- **Simple** - By providing only a minimal API surface, gulp is easy to learn and simple to use

## Sample `gulpfile.js`

This file will give you a taste of what gulp does.

```js
var ggs = require('gulp-git-sftp'),
    cnf = require('./config/cnf'), // Look in help directory
    argv = require('yargs').argv,
    gulp = require('gulp'),
    CNF = ggs.cnf(cnf);
    
    console.log('CNF:', CNF)

var FTP = ggs.ftp(CNF);

var conn = FTP.conn({
    user: argv.user || CNF.user,
    pass: argv.pass || CNF.pass,
    host: argv.host || CNF.host,
});

gulp.task('fgit', function() {
    
    var files = argv.f;
        
    if (!files) return;
    
    files = FTP._file2format( files.split(',') );
    console.log(files)
    
    ggs.git({
        conn: conn,
        files: files,
        basePath: CNF.basePath,
        remotePath: CNF.remotePath,
    }, function(err) {
        if (err) console.log('ERRROR2:', err);
        console.log('Files from -f to FTP is deployed!!!')
        return true;
    });
});

gulp.task('git', function() {
    ggs.git({
        conn: conn,
        basePath: CNF.basePath,
        remotePath: CNF.remotePath,
    }, function(err) {
        if (err) console.log('ERRROR2:', err);
        console.log('Files from git to FTP is deployed!!!')
        return true;
    });
});

gulp.task('deploy', function() {
       
    if (!argv.del) {
        gulp.src( ['./**/*', '!node_modules{,/**}', '!bower{,/**}', '!bower_components{,/**}', '**/.htaccess'], { base: CNF.basePath, buffer: false } )
            .pipe( conn.newer( CNF.remotePath || argv.remotePath ) ) // only upload newer files 
            .pipe( conn.dest( CNF.remotePath || argv.remotePath ) );
    } else {
        // conn.delete(CNF.remotePath+'dd', function(e) {
        conn.rmdir(CNF.remotePath, function(e) {
            console.log('deleted:', CNF.remotePath);
        });
    }
});

// BUILD TASKS 
// ...

});

```