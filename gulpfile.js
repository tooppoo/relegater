const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const del = require('del');

gulp.task('compile', ['clean:src'], () => {
  const tsProject = ts.createProject('tsconfig.json');

  const result = gulp.src('src/*.ts')
                     .pipe(tsProject());

  const dts = new Promise((resolve, reject) => {
    result.dts.pipe(gulp.dest('dest/dts'))
              .on('end', resolve)
              .on('error', reject);
  });
  const js = new Promise((resolve, reject) => {
    result.js.pipe(gulp.dest('dest/src'))
             .on('end', resolve)
             .on('error', reject);
  });

  return Promise.all([dts, js]);
});
gulp.task('watch', ['compile'], () => {
  gulp.watch(['src/*.ts', 'test/*.ts'], ['test']);
});

gulp.task('lint', () => {
  return gulp.src(['src/*.ts'])
             .pipe(tslint({
               formatter: 'stylish',
             }))
             .pipe(tslint.report());
});

gulp.task('compile:test', ['clean:test'], () => {
  const tsProject = ts.createProject('tsconfig.json');

  return gulp.src('test/*.ts')
             .pipe(tsProject())
             .js
             .pipe(gulp.dest('dest/test'));
});
gulp.task('pre:test', ['compile', 'compile:test'], () => {
  return gulp.src(['dest/src/*.js'])
             .pipe(istanbul())
             .pipe(istanbul.hookRequire());
});
gulp.task('test', ['pre:test'], () => {
  return gulp.src(['dest/test/*.js'])
             .pipe(mocha())
             .pipe(istanbul.writeReports());
});

gulp.task('clean:src', del.bind(null, ['dest/src', 'dest/dts']));
gulp.task('clean:test', del.bind(null, ['dest/test', 'coverage']));
gulp.task('default', []);
