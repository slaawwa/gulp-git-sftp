
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/gulp-git-sftp
[downloads-image]: https://img.shields.io/npm/dm/gulp-git-sftp.svg
[npm-image]: https://img.shields.io/npm/v/gulp-git-sftp.svg

## Install `gulp-git-sftp` with `--save-dev`

```sh
$ npm i gulp-git-sftp -D
```

## What is gulp-git-sftp?

- **gulp** - gulp...
- **git** - git...
- **sftp** - sftp...
- **Simple** - By providing only a minimal API surface, gulp is easy to learn and simple to use

## Sample use

```sh
# Load index.html and my.css and delete old.html
$ gulp dep:files -f=index.html,my.css,del:old.html
```

```sh
# Load and delete all changes form git (what `git add` now)
# So, it is cool use before commit for preprod server for hot test
$ gulp dep:git
```

```sh
# Load all files to server
$ gulp deploy
```

```sh
# Delete all files to server
$ gulp deploy --del
```

```sh
# Load all files to server from `dist` (local directory) to `public` (remote directory)
$ gulp deploy --basePath=dist --remotePath=public
```

```sh
# Delete `public` directory on remote side
$ gulp deploy --remotePath=public --del
```

### for more information about config watch [Help] directory
```sh
# Deploy files to prod server in config 
$ gulp deploy --dephost=prod
```


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

var conn = FTP.conn();

gulp.task('dep:files', function() {
    
    var files = argv.f;
        
    if (!files) return;
    
    files = FTP._file2format( files.split(',') );
    console.log(files)
    
    // TODO: need add return for correct work with stream 
    // return ggs.git({...}, (err)=>{...});
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

gulp.task('dep:git', function() {
    // TODO: need add return for correct work with stream 
    // return ggs.git({...}, (err)=>{...});
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
        return gulp.src( [`${CNF.basePath}/**/*`, '!node_modules{,/**}', '!bower{,/**}', '!bower_components{,/**}', '**/.htaccess'], { base: CNF.basePath, buffer: false } )
            .pipe( conn.newer( CNF.remotePath || argv.remotePath ) ) // only upload newer files 
            .pipe( conn.dest( CNF.remotePath || argv.remotePath ) );
    } else {
        // conn.delete(CNF.remotePath+'dd', function(e) {
        return conn.rmdir(CNF.remotePath, function(e) {
            console.log('deleted:', CNF.remotePath);
        });
    }
});

// BUILD TASKS 
// ...

```
## And create alias in `package.json`

Something like that:

```
"scripts": {
    "depfront:prod": "gulp deploy --remotePath=frontend --basePath=frontend --dephost=prod",
    "depfront": "gulp deploy --remotePath=frontend --basePath=frontend",
    "depback:prod": "gulp deploy --remotePath=backend --basePath=backend --dephost=prod",
    "depback": "gulp deploy --remotePath=backend --basePath=backend",
    "deploy:prod": "gulp deploy --dephost=prod",
    "deploy": "gulp deploy",
    "depfront:del:prod": "gulp deploy --remotePath=frontend --dephost=prod --del",
    "depfront:del": "gulp deploy --remotePath=frontend --del",
    "depback:del:prod": "gulp deploy --remotePath=backend --dephost=prod --del",
    "depback:del": "gulp deploy --remotePath=backend --del",
    "deploy:del:prod": "gulp deploy --dephost=prod --del",
    "deploy:del": "gulp deploy --del"
} 
```

   [Help]: <https://github.com/slaawwa/gulp-git-sftp/tree/master/help>
