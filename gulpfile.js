/**
 * Daniel Cobb
 * 2-22-17
 * Gulp File
 */

const gulp = require('gulp');
const debug = require('tynydebug');
const argv = require('yargs').argv;

gulp.task('verBump', () => {
  const getVersion = debug.updateVersion(argv.ver, argv.rel);
  console.log(getVersion);
});
