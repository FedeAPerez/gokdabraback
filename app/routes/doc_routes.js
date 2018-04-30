// routes/doc_routes.js

module.exports = function(app) {
	app.all('/*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	});
	app.get('/doc',
		(req, res) => {
		    console.log("PING PING PING");
		    res.status(200).send({});
  		}
  	);
  	app.get('/',
		(req, res) => {
		    console.log("PING PING PING");
		    res.status(200).send({});
  		}
  	);
};