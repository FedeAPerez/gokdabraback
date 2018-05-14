// routes/business_routes.js

module.exports = function(app, db_client, DB_ENV) {
	app.get('/business', 
		(req,res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("prospects");
			prospectsCollection.find({}).toArray()
			.then((getResult) => {
				console.log(getResult);
				res.status(200).send({
					"route":"business",
					"operation":"GET",
					"data": getResult
				});
			})
			.catch((err) => {

			});

		}
	);
	app.post('/business',
		(req, res) => {
			// Asignación de variables
			var timestamp = new Date().getTime();;
			var contact_mail = req.body.contact_mail;

			// CRUD a Mongo
			const prospectsCollection = db_client.db(DB_ENV).collection("prospects");
			prospectsCollection.insertOne({
				contact_mail : contact_mail,
				timestamp : timestamp
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