const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compilaSaas() {
    return gulp.src('src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dist/styles/'))
}

exports.build = gulp.series(compilaSaas)
exports.dev = function() {
    gulp.watch('src/styles/**/*.scss', gulp.series(compilaSaas))
}