'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const jsonMinify = require('gulp-json-minify')
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;

function compilaSass() {
    return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/css/'));
};

function comprimeImagens() {
    return gulp.src('source/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/'));
};

function minificaHTML() {
    return gulp.src('source/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

function minificaJS() {
    return gulp.src('source/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/javascript/'));
}

function minificaJson() {
    return gulp.src('source/data/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('build/data/'))
        .on('error', util.log);
}

exports.dev = function () {
    gulp.watch('./source/sass/*.scss', gulp.parallel(compilaSass))
    gulp.watch('./source/javascript/*.js', gulp.parallel(minificaJS))
    gulp.watch('./source/data/*.json', gulp.parallel(minificaJson))
    gulp.watch('./source/*.html', gulp.parallel(minificaHTML))
}

exports.build = gulp.series(compilaSass, comprimeImagens, minificaHTML, minificaJS, minificaJson);
