var gulp = require('gulp') ;

var sass = require('gulp-sass');
var gutil = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps')
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify-es').default
var gulpif = require('gulp-if')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var del = require('del')
var browserify = require('browserify')

var connect = require('gulp-connect')

var debug = false

gulp.task('detectDebug', function(done) {
    // start gulp task with --debug and it will use the debug options
    debug = (!!gutil.env.debug)
    console.log('Debugging is ' + (debug ? 'enabled' : 'disabled'))
    done()
})

// JSHint task
gulp.task('lint', function(done) {
    return gulp.src([ './*.js', './public/js/*.js' ])

        .pipe(jshint({
            // This option suppresses warnings about missing semicolons
            asi : true,

            // This option suppresses warnings about == null comparisons
            eqnull : true,

            // deprecated: This option suppresses most of the warnings about possibly
            // unsafe line breakings
            laxbreak : true,

            // deprecated: This option requires you to capitalize names of constructor
            // functions
            newcap : false
        }))

        .pipe(jshint.reporter('default'))
})

gulp.task('browserifyJs', gulp.series('detectDebug', function() {
    del([ 'public/dist/index.js', 'public/dist/index.js.map' ]);
    // browserify the main code into one file plus optional source map

    console.log('browserifyJs');
    return browserify({
        entries : [ 'public/js/index.js' ],
        insertGlobals : false,
        debug : debug
    })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulpif(!debug, uglify({output: {ascii_only:true}})))
        .pipe(gulp.dest('public/dist'));
}));

gulp.task('moveJSToDist', function() {
    return gulp.src('public/js/index.js')
        .pipe(gulp.dest('public/dist'));
})

gulp.task('moveHtmlToDist', function() {
    return gulp.src(['public/*.html', 'public/sitemap.xml'])
        .pipe(gulp.dest('public/dist'));
})

gulp.task('moveImgToDist', function() {
    return gulp.src('public/img/**/*')
        .pipe(gulp.dest('public/dist/img'));
})

gulp.task('moveFontsToDist', function() {
    return gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('public/dist/fonts'));
})

gulp.task('connect', function(done) {
    connect.server({
        root: 'public/dist',
        livereload: true
    })
    done()
})

gulp.task('reloadConnect', function () {
    return gulp.src('public/*')
        .pipe(connect.reload())
})

// Convert sass files to sass files
gulp.task('sass', function () {
    return gulp.src('./public/sass/index.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/dist/sass'));
});

gulp.task('build', gulp.series('lint', 'browserifyJs', 'moveHtmlToDist', 'moveImgToDist', 'moveFontsToDist', 'sass'))


// Watch our scripts and compile them if necessary for debugging in the browser
gulp.task('watch', function(done) {
    gulp.watch([ 'public/js/*.js', 'public/sass/*.sass', 'public/*.html' ], gulp.series('build', 'reloadConnect'))
    done()
})

// Dev task supposed to run during development
gulp.task('default', gulp.series('build', 'connect' , 'watch'))
