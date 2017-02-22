/**
 * Daniel Cobb
 * 2-22-17
 * Gulp File
 */

const gulp = require('gulp');
const git = require('gulp-git');
const debug = require('tynydebug');
const argv = require('yargs').argv;
const fs = require('fs');

// bump the version
gulp.task('ver-bump', (cb) => {
  const getVersion = debug.updateVersion(argv.ver, argv.rel);
  // get and parse package.json
  fs.readFile('package.json', (err, data) => {
    if (err) throw err;
    const pack = JSON.parse(data);
    const newVersion = pack;
    // change the version number
    newVersion.version = getVersion;
    // write the file
    fs.writeFileSync('package.json', JSON.stringify(newVersion, null, 2));
  });
  cb(console.log('cb'));
});

// add the files and create  commit
gulp.task('add-commit', ['ver-bump'], (cb) => {
  gulp.src('.', (err) => {
    if (err) throw err;
  })
  .pipe(git.add())
  .pipe(git.commit('Testing entire git sequence, ver should be 1.1.0'));
  cb();
});

// push to repo
gulp.task('push', ['add-commit'], () => {
  git.push('origin', 'ver-bump', { args: ' -u' }, (err) => {
    if (err) throw err;
  });
});

// start tasks
gulp.task('bump', ['ver-bump', 'add-commit', 'push']);
