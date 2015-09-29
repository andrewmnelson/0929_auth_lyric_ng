'use strict';

var express = require('express');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_dev');

var app = express();

app.use(express.static(__dirname + '/build'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('lyrics server listening on ' + port + ' at ' + new Date().toString());
});
 