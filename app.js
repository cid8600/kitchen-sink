'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var home = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
var mediawall = require('./routes/mediawall');
var liveblog = require('./routes/liveblog');
var livereviews = require('./routes/livereviews');
var livechat = require('./routes/livechat');
var sidenotes = require('./routes/sidenotes');

var app = express();

app.engine('html', require('hogan-express'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('partials', {header: '_header', navbar: '_navbar', sidenotesContent: '_sidenotesContent', footer: '_footer'});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', home);
app.use('/comments', comments);
app.use('/users', users);
app.use('/mediawall', mediawall);
app.use('/liveblog', liveblog);
app.use('/livereviews', livereviews);
app.use('/livechat', livechat);
app.use('/sidenotes', sidenotes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
