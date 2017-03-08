var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var orderAPI = require('./routes/orderAPI');
var menuAPI = require('./routes/menuAPI');

var app = express();

var port = 3000;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

//Set Static Folder for Angular 2
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/orderApi', orderAPI);
app.use('/menuApi', menuAPI);
app.use('/', index);

app.listen(port, function(){
   console.log("Server started at address: http://localhost:"+port); 
});