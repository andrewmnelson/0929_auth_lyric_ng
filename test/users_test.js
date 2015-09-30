'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var httpBasic = require(__dirname + '/../lib/http_basic')

var server = require(__dirname + '/../server');
var userURL = 'localhost:3000/api'

process.env.MONGOLAB_URI = 'mongodb://localhost/lyrics_test';

var User = require(__dirname + '/../models/user');

describe('httpBasic', function() {
  it('should be able to parse http basic authentication', function() {
    var req = { headers:
      { authorization: 'Basic ' + (new Buffer('test:testpass')).toString('base64')}
    };
    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('test');
      expect(req.auth.password).to.eql('testpass');
    });
  });
});

describe('authentication', function() {
  // after(function(done) {  // clean up the database for the next test run
  //   mongoose.connection.db.dropDatabase(function(err) {
  //     if (err) return console.log(err);
  //     done();
  //   });
  // });
  it('should allow creation of a new user', function(done) {
    chai.request(userURL)
    .post('/createUser')
    .send({username: 'test', password: 'testpass'})
    .end(function(err, resp) {
      expect(err).to.eql(null);
      expect(resp.body.token).to.have.length.above(0);
      done();
    });
  });
});