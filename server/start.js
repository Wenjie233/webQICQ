'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('express')();

require('./config/router')(app);
require('./config/express')(app);
require('./config/io')(app);

app.listen(3000, function(){
	console.log('listen 3000 port');
});