var express = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    http = require('http'),
    path = require('path'),
    winston = require('winston'),
    sqlinit = require('./server/sqlinit'),

    // App modules
    sessions = require('./server/sessions'),
    users = require('./server/users'),
    schedule = require('./server/schedule'),
    auth = require('./server/auth'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(compression());
app.use(bodyParser());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, './client')));

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.send(500, err.message);
});

app.post('/login', auth.login);
app.post('/logout', auth.validateToken, auth.logout);
app.post('/signup', auth.signup);

app.get('/users/me', auth.validateToken, users.getProfile);
app.put('/users/me', auth.validateToken, users.updateProfile);

app.get('/sessions', auth.validateToken, sessions.getAll);
app.get('/sessions/:id', auth.validateToken, sessions.getById);

app.get('/schedule', auth.validateToken, schedule.getItems);
app.post('/schedule', auth.validateToken, schedule.addItem);
app.delete('/schedule/:id', auth.validateToken, schedule.deleteItem);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});