'use strict';

var express = require('express');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_dev');

var lyricsLog = require(__dirname + '/lib/lyrics_log');

var lyricsRouter = require(__dirname + '/routes/lyrics_routes');
var usersRouter = require(__dirname + '/routes/users_routes');

var app = express();
app.use(express.static(__dirname + '/build'));
app.use('/api', lyricsRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('lyrics server listening on ' + port + ' at ' + new Date().toString());
});
 