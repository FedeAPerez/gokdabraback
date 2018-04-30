// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const app            	= express();

const port 				= 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/routes')(app);

app.listen((process.env.PORT || 5000), () => {
	console.log('Se está ejecutando en el puerto: ' + 5000);
});     
          