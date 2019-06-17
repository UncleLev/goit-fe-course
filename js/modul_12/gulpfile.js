const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const clean = require('gulp-clean');

const jsFile = [
    'src/js/lib.js',
    'src/js/index.js'
];

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
});

gulp.task('clean', function () {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src(jsFile)
        .pipe(concat('index.js'))
        .pipe(babel())
        .pipe(gulpIf('*.js', uglify({
            toplevel: true
        })))
        .pipe(gulp.dest("build/js"))
})

gulp.task('build', gulp.series('clean', 'js', 'sass'));