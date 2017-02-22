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
  // get and parse package.json
  const pack = JSON.parse(fs.readFileSync('package.json'));
  // set a newVersion equal to the old package.json
  const newVersion = pack;
  // change the version number
  newVersion.version = getVersion;
  // write the file
  fs.writeFileSync('package.json', JSON.stringify(newVersion, null, 2));
  // git add, git commit, git push to release
});
