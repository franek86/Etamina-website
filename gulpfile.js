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
      baseDir: './'
    }
  });
});


/** compile files from scss to css **/
gulp.task('sass', function(){
  return gulp.src('assets/css/main.scss')
            .pipe(sass({
                includePaths: ['css'],
                style: 'compressed',
                onError: browserSync.notify
            }))
            .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
            .pipe(cleanCss())
            .pipe(rename('main.min.css'))
            .pipe(gulp.dest('assets/css'))
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
        'assets/js/custom.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(reload({stream: true}));
});


/** jade task **/
gulp.task('jade', function(){
  return gulp.src('./jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));;
});

/** index task **/
gulp.task('index', function(){
  return gulp.src('./index.html')
    .pipe(reload({stream: true}));;
});

/** watch changes css, js, jade. html file **/
gulp.task('watch', function(){
    gulp.watch('assets/css/**/*', ['sass']);
    gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch('./*.html').on('change', reload);
    gulp.watch(['./jade/includes/*.jade', './jade/*.jade'], ['jade']);
});



/** default task, running gulp **/
gulp.task('default', ['browser-sync', 'scripts', 'jade','index','watch']);
