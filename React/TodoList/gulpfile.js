var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// gulp.task('default', function(){
//     console.log('Gulp: Hello world');
//     }
// );

gulp.task('default', function(){
        
        return browserify('./source/app.js')
                 .transform(babelify)
                 .bundle()
                 .pipe(source('todolist.js'))
                 .pipe(gulp.dest('./build/'));
    }
);