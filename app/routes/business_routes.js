// routes/business_routes.js

module.exports = function(app, db_client, DB_ENV) {
	app.get('/business/prospect/all', 
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

	app.post('/business/prospect',
		(req, res) => {
			// Asignación de variables
			var timestamp = new Date();
			var contact_mail = req.body.contact_mail;

			// CRUD a Mongo
			const prospectsCollection = db_client.db(DB_ENV).collection("prospects");
			prospectsCollection.insertOne({
				contact_mail : contact_mail,
				timestamp : timestamp
			})
			.then((insertResult) => {
				res.status(204).send({
					"route":"business",
					"operation":"POST",
					"data": insertResult
				});
			})
			.catch((err) => {

			});

  		}
  	);
};