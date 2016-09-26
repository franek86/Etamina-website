var gulp    =   require('gulp'),
    uglify  =   require('gulp-uglify'),
    concat  =   require('gulp-concat'),
    sass    =   require('gulp-sass'),
    cleanCss    =   require('gulp-clean-css'),
    rename    =   require('gulp-rename'),
    jade    =   require('gulp-jade'),
    autoprefix    = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload   =  browserSync.reload;

/** Wait for sass reload and launch server **/
gulp.task('browser-sync', ['sass'], function(){
  browserSync({
    server: {
      baseDir: './app/'
    }
  });
});


/** compile files from scss to css **/
gulp.task('sass', function(){
  return gulp.src('app/css/main.scss')
            .pipe(sass({
                includePaths: ['css'],
                style: 'compressed',
                onError: browserSync.notify
            }))
            .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
            .pipe(cleanCss())
            .pipe(rename('main.min.css'))
            .pipe(gulp.dest('app/css'))
            .pipe(reload({stream: true}));
});


/** concat javascript bower_components bootstrap,jquery etc **/
gulp.task('scripts', function(){
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/waypoints/lib/jquery.waypoints.min.js',
        'bower_components/jquery-animateNumber/jquery.animateNumber.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'app/js/custom.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream: true}));
});


/** jade task **/
gulp.task('jade', function(){
  return gulp.src('app/jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('app'))
    .pipe(reload({stream: true}));;
});

/** index task **/
gulp.task('index', function(){
  return gulp.src('app/index.html')
    .pipe(reload({stream: true}));;
});

/** watch changes css, js, jade. html file **/
gulp.task('watch', function(){
    gulp.watch('app/css/**/*', ['sass']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/*.html').on('change', reload);
    gulp.watch(['app/jade/includes/*.jade', 'app/jade/*.jade'], ['jade']);
});



/** default task, running gulp **/
gulp.task('default', ['browser-sync', 'scripts', 'jade','index','watch']);
