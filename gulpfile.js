/// <binding ProjectOpened='watch' />


var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('src/assets/css'))
}); 

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});