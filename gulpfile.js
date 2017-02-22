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
gulp.task('ver-bump', (cb, err) => {
  const getVersion = debug.updateVersion(argv.ver, argv.rel);
  // get and parse package.json
  fs.readFile('package.json', (error, data) => {
    if (error) throw error;
    const pack = JSON.parse(data);
    const newVersion = pack;
    // change the version number
    newVersion.version = getVersion;
    // write the file
    fs.writeFileSync('package.json', JSON.stringify(newVersion, null, 2));
  });
  if (err) throw err;
  cb();
});

// add the files and create commit
gulp.task('add-commit', ['ver-bump'], (cb) => {
  gulp.src('.', (err) => {
    if (err) throw err;
  })
  .pipe(git.add())
  .pipe(git.commit('Version Bumped, sending to Release Branch'))
  .on('end', cb);
});

// push to repo
gulp.task('push', ['ver-bump', 'add-commit'], (cb) => {
  git.push('origin', 'ver-bump', { args: ' -u' }, (err) => {
    if (err) throw err;
  })
  .on('end', cb);
});

// run the tasks
gulp.task('bump', ['ver-bump', 'add-commit', 'push']);

// extra tasks
gulp.task('cmt', () => {
  gulp.src('.', (err) => {
    if (err) throw err;
  })
  .pipe(git.add())
  .pipe(git.commit(argv.m));
});
