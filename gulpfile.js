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
