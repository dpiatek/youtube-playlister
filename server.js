var connect = require('connect'),
    http = require('http'),
    static = require('serve-static'),
    port = process.env.PORT || 5000,
    app = connect();

app.use(static('dist'));
http.createServer(app).listen(port);
console.log('Listening on http://localhost:' + port);
