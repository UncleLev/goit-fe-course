const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    // Other watchers
})

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        // .pipe(gulpIf('app/js/*.js', uglify()))
        .pipe(gulp.dest('dist'))
});
// gulp.task('ggo', function () {
//     return gulp.src('app/js/*.ts')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js/main.ts'))
// });

// gulp.task('TS', function () {
//     return gulp.src('app/js/**/*.ts')
//     .pipe(())
//     .pipe(gulp.dest('app/css'))
// });
gulp.task('build', function (callback) {
    runSequence('clean:dist', 
      ['sass', 'useref', 'images', 'fonts'],
      callback
    )
  })