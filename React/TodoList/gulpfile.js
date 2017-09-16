var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function(){
     gulp.start('todo_v1', 'todo_v2', 'todo_v3');
    }
);

gulp.task('todo_v1', function(){
        
        return browserify('./source/app_v1.js')
                 .transform(babelify)
                 .bundle()
                 .pipe(source('todolist.js'))
                 .pipe(gulp.dest('./build/v1/'));
    }
);

gulp.task('todo_v2', function(){
        
        return browserify('./source/app_v2.js')
                 .transform(babelify)
                 .bundle()
                 .pipe(source('todolist.js'))
                 .pipe(gulp.dest('./build/v2/'));
    }
);

gulp.task('todo_v3', function(){
        
        return browserify('./source/app_v3.js')
                 .transform(babelify)
                 .bundle()
                 .pipe(source('todolist.js'))
                 .pipe(gulp.dest('./build/v3/'));
    }
);