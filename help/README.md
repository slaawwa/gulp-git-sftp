
# Configuration instraction

## First copy `config` directory for your project and `.gitignore`

```sh
#.gitignore
config/cnf.js
```

## Second install yargs package

```sh
$ npm i yargs -D
```

## And last step use this config in your `gulpfile.js`
```js
    var gss = require('gulp-git-sftp'),
        cnf = gss.cnf(require('./config/cnf.js')),
        CNF = ggs.cnf(cnf),
        FTP = ggs.ftp(CNF);

    var conn = FTP.conn();
    ...
```
