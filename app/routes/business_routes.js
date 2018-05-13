// routes/business_routes.js

module.exports = function(app, db_client) {
	app.get('/business', 
		(req,res) => {
			const prospectsCollection = db_client.db("test").collection("prospects");
			var getResult = prospectsCollection.find().toArray();
			res.status(200).send({
				"route":"business",
				"operation":"GET",
				"data": getResult
			});
		}
	);
	app.post('/business',
		(req, res) => {
			const prospectsCollection = db_client.db("test").collection("prospects");
			prospectsCollection.insertOne({
				contact_mail:'req.body.contact_mail'
			}, function(err, res) {
				console.log("errores " + err);
				console.log("resultado " + res);
			});
			res.status(204).send({
				"route":"business",
				"operation":"POST"
			});
  		}
  	);
};