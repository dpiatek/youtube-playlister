var connect = require('connect'),
    http = require('http'),
    static = require('serve-static'),
    logger = require('morgan'),
    port = process.env.PORT || 5000,
    env = process.env.YT_PL_ENV || 'development',
    app = connect();

if (env == 'production') {
  app.use(logger('short'));
  app.use(static('dist'));
} else {
  app.use(logger('dev'));
  app.use(static('app'));
}

http.createServer(app).listen(port);
console.log('Listening on http://localhost:' + port);
