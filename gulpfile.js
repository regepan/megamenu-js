"use strict";

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const notify       = require('gulp-notify');
const gulpif       = require('gulp-if');
const minimist     = require('minimist');

/**********************************************
 *
 *
 *
 **********************************************/
const options = minimist(process.argv.slice(2), {
  string: 'env',
  default: {env: process.env.NODE_ENV || 'development'} // NODE_ENVに指定がなければ開発モードをデフォルトにする
});
const isProduction = (options.env === 'production');// $ gulp --env production

console.log('env is ' + options.env);

/**********************************************
 *
 *
 *
 **********************************************/
const baseDir = './';
const _scssDir          = [
  'scss/**/*.scss',
  '!' + 'scss/xxx.scss'
];
const _cssDir       = baseDir + 'css/';

let updateSourceTime;

/**********************************************
 *
 *
 *
 **********************************************/
function scss() {
  const startTime = Date.now();

  return gulp.src(_scssDir)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([autoprefixer()]))
    // .pipe(cleanCss(cleanCssConfig))
    // .pipe(gulpif(isProduction, cleanCss()))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(_cssDir))
    .pipe(notify({
      onLast: true,
      title: "SCSS build is finished!",
      message: Date.now() - startTime + ' ms'
    }));
}

/**********************************************
 *
 *
 *
 **********************************************/
function watchFiles() {
  const scssWatcher = gulp.watch(
    _scssDir,
    gulp.parallel(scss));

  scssWatcher.on('change', function(path, stats) {
    console.log('scssWatcher: File ' + path + ' was changed');
  });
}

/**********************************************
 *
 *
 *
 **********************************************/
exports.default = gulp.series(scss, watchFiles);
