var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var async = require("async");

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('/api',function(req, res) {
	 res.send("hello api");
})

app.listen(process.env.PORT || 5000);
