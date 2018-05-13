// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();
var MongoClient = require('mongodb').MongoClient;
const port 				= 8000;
const DB_ENV = process.env.DB_ENV;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors()) 

var uri = "mongodb+srv://kdabra_back:KdabraArg2017@clusterkdabraprospects-gpmi4.mongodb.net/"+DB_ENV+"?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
	require('./app/routes')(app, client);
 });

app.listen((process.env.PORT || 5000), () => {
	console.log('Se está ejecutando en el puerto: ' + 5000);
});     
          