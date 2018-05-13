// routes/doc_routes.js

module.exports = function(app, db_client) {

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