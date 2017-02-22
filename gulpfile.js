/**
 * Daniel Cobb
 * 2-22-17
 * Gulp File
 */

const gulp = require('gulp');
const debug = require('tynydebug');
const argv = require('yargs').argv;
const fs = require('fs');

gulp.task('verBump', () => {
  const getVersion = debug.updateVersion(argv.ver, argv.rel);
  console.log(getVersion);
  // get package.json
  const pack = JSON.parse(fs.readFileSync('package.json'));
  console.log(pack);
  // update the version number
  // save package.json
  // git add, git commit, git push to release
});
