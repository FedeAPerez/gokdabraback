// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();

const port 				= 8000;

app.use(cors())
app.options('*', cors()) 
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);

app.listen((process.env.PORT || 5000), () => {
	console.log('Se está ejecutando en el puerto: ' + 5000);
});     
          