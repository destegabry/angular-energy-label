const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const embedTemplates = require('gulp-angular-embed-templates');
const iife = require('gulp-iife');
const git = require('gulp-git-streamed');

const pjson = require('./package.json');

const targetBrowsers = ['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 9'];

const config = {
  name: pjson.name,
  header: [
    `/**`,
    ` * ${pjson.name} - ${pjson.description}`,
    ` * Version v${pjson.version}`,
    ` * Homepage: ${pjson.homepage}`,
    ` * Author: ${pjson.author}`,
    ` */\n`
  ].join('\n'),
  path: {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    examples: path.join(__dirname, 'examples')
  },
  sass: {
    outputStyle: 'expanded'
  },
  cleanCSS: {
    compatibility: 'ie9'
  },
  autoprefixer: {
    browsers: targetBrowsers
  },
  babel: {
    presets: [['env', {targets: {browsers: targetBrowsers}}]]
  },
  iife: {
    useStrict: false
  }
};

config.browserSync = {
  server: {
    baseDir: [],
    routes: {
      '/node_modules': path.join(__dirname, 'node_modules'),
      '/angular-energy-label': config.path.dist
    }
  },
  open: false
};

gulp.task('clean', () => {
  return gulp.src(config.path.dist, {read: false})
    .pipe(clean());
});

gulp.task('js', () =>
gulp.src(path.join(config.path.src, '**', '*.js'))
    .pipe(embedTemplates())
    .pipe(concat(`${config.name}.js`))
    .pipe(babel(config.babel))
    .pipe(iife(config.iife))
    .pipe(header(config.header))
    .pipe(gulp.dest(config.path.dist))
    .pipe(uglify())
    .pipe(concat(`${config.name}.min.js`))
    .pipe(header(config.header))
    .pipe(gulp.dest(config.path.dist))
);

gulp.task('css', () =>
  gulp.src(path.join(config.path.src, 'index.scss'))
    .pipe(sass(config.sass).on('error', sass.logError))
    // .pipe(sourcemaps.write(config.path.dist)) // FIXME
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(concat(`${config.name}.css`))
    .pipe(header(config.header))
    .pipe(gulp.dest(config.path.dist))
    .pipe(cleanCSS(config.cleanCSS))
    .pipe(concat(`${config.name}.min.css`))
    .pipe(header(config.header))
    .pipe(gulp.dest(config.path.dist))
);

gulp.task('sass', () =>
  gulp.src(path.join(config.path.src, 'style', '*.scss'))
    .pipe(concat(`${config.name}.scss`))
    .pipe(header(config.header))
    .pipe(gulp.dest(config.path.dist))
);

gulp.task('examples', () => {
  const options = Object.assign({}, config.browserSync);
  options.server.baseDir.push(config.path.examples);
  browserSync.init(options);
  gulp.watch(path.join(config.path.examples, '**', '*.{html,css,js}')).on('change', browserSync.reload);
  gulp.watch(path.join(config.path.examples, '**', '*.scss')).on('change', () =>
    gulp.src(path.join(config.path.examples, '**', '*.scss'))
      .pipe(sass(config.sass).on('error', sass.logError))
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(gulp.dest(config.path.examples))
  );
  gulp.watch(config.path.dist).on('change', browserSync.reload);
  gulp.watch(config.path.src).on('change', gulp.series('default'));
});

gulp.task('git', () => {
  const semver = pjson.version;
  const message = `Released version ${semver}`;

  return gulp.src(['package.json', path.join(config.path.dist, '*')])
    .pipe(git.commit(message))
    .pipe(git.tag(`v${semver}`, message));
});

gulp.task('build', gulp.parallel('sass', 'css', 'js'));

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('serve:examples', gulp.series('default', 'examples'));

gulp.task('version', gulp.series('clean', 'build', 'git'));
