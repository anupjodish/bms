
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cache = require('express-redis-cache')({
    host: config.redisCacheUrl,
    port: config.redisCachePort,
    prefix: 'intl-cache:',
    expire: {
        200: config.redisCacheLimit,
        404: 1,
        403: 1,
        500: 1,
        xxx: 1
    }
});

var app = express();
const http = require('http');

var httpServer = http.createServer({

}, app).listen(4000, function(err) {
    if (err) throw new Error(err);
    logger.info('https listening on ', 4000);
});
