const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function compilaSaas() {
    return gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/styles/'))
}

exports.build = gulp.series(compilaSaas)
exports.dev = function() {
    gulp.watch('src/styles/**/*.scss', gulp.series(compilaSaas))
}