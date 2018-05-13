// routes/business_routes.js

module.exports = function(app, db_client) {
	app.post('/business',
		(req, res) => {
			const prospectsCollection = client.db("test").collection("prospects");
			prospectsCollection.insertOne({
				contact_mail:'req.body.contact_mail'
			}, function(err, res) {
				console.log("errores " + err);
				console.log("resultado " + res);
			});
			res.status(200).send({});
  		}
  	);
};