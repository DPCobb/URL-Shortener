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
  cb();
});

// add the files and create  commit
gulp.task('add-commit', ['ver-bump'], (cb) => {
  gulp.src('.', (err) => {
    if (err) throw err;
  })
  .pipe(git.add())
  .pipe(git.commit('gulp bump'));
  cb();
});

// push to repo
gulp.task('push', ['ver-bump', 'add-commit'], (cb) => {
  git.push('origin', 'ver-bump', { args: ' -u' }, (err) => {
    if (err) throw err;
  });
  cb();
});

// start tasks
gulp.task('bump', ['ver-bump', 'add-commit', 'push'], () => {
  
});
