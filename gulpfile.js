// const gulp = require('gulp');

// const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('gulp-cssnano'); // for css
// const rev = require('gulp-rev');

// const uglify = require('gulp-uglify-es').default;  // used to minify the js

// const imagemin = require('gulp-imagemin');  // for images
// const del = require('del'); // deletes files and directories

const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano'); // for css
const rev = require('gulp-rev');

const uglify = require('gulp-uglify-es').default;  // used to minify the js

const imagemin = require('gulp-imagemin');  // for images
const del = require('del'); // deletes files and directories









gulp.task('css', function(done) {
    console.log('minify css');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({      // manifest creates the hash of the css files
        cwd: 'public',
        hash: true,
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


gulp.task('js', function(done){
    console.log('uglifying js');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        hash: true,
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', function(done){
    console.log('compressing images');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        hash: true,
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


//empty the public asset directory

gulp.task('clean:assets', function(done){
    console.log('deleting min files');
    del.sync('./public/assets/**', '!public/assets');
    done();
});





// to run all the tasks
gulp.task('build', gulp.series('clean:assets', 'css','js','images'), function(done){
    console.log('building assets');
    done();
});

