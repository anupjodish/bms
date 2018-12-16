var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cache = require('express-redis-cache')({
  host: '127.0.0.1',
  port: 6379,
  prefix: 'intl-cache:',
  expire: {
    200: 30 *60,
    404: 1,
    403: 1,
    500: 1,
    xxx: 1
  }
});

var app = express();
const http = require('http');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('hello world')
})
app.post('/setdata', function(req, res) {
  console.log('set data called...');
  var data = req.body.data;
  res.express_redis_cache_name = 'body-' + data;
  res.send('ok');
});

var httpServer = http.createServer({}, app).listen(4000, function(err) {
  if (err)
    throw new Error(err);
   console.log('https listening on ', 4000);
});
