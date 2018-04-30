// routes/doc_routes.js

module.exports = function(app) {

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