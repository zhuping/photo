var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
// does not handle multipart bodies, due to their complex and typically large nature
// var bodyParser = require('body-parser');
var multer = require('multer')
var errorhandler = require('errorhandler')
var methodOverride = require('method-override');
// var routes = require('./routes');
var photos = require('./routes/photos');
var http = require('http');
var path = require('path');

var app = express();
var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(morgan('dev'));
app.use(multer());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.set('photos', __dirname + '/public/photos');

if ('development' == env) {
    app.use(errorhandler());
}

// app.get('/', routes.index);
app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')));

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
})