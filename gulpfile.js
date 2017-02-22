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

gulp.task('verBump', () => {
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
});

// add the files and create  commit
gulp.task('add-commit', () => {
  gulp.src('.', (err) => {
    if (err) throw err;
  })
  .pipe(git.add())
  .pipe(git.commit('testing push'));
});

// push to repo
gulp.task('push', ['add-commit'], () => {
  git.push('origin', 'ver-bump', { args: ' -u' }, (err) => {
    if (err) throw err;
  });
});

// start tasks
gulp.task('bump', ['add-commit', 'push']);
