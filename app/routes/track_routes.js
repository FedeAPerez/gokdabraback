// routes/track_routes.js

module.exports = function(app, db_client, DB_ENV) {
	app.get('/track', 
		(req,res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("track");
			prospectsCollection.find({}).toArray()
			.then((getResult) => {
				console.log(getResult);
				res.status(200).send({
					"route":"track",
					"operation":"GET",
					"data": getResult
				});
			})
			.catch((err) => {

			});

		}
	);
	app.post('/track',
		(req, res) => {
			// Asignación de variables
			var timestamp = new Date();
			var data = req.body.data;

			// CRUD a Mongo
			const prospectsCollection = db_client.db(DB_ENV).collection("track");
			prospectsCollection.insertOne({
				data : data,
				timestamp : timestamp
			}, function(err, res) {
				console.log("errores " + err);
				console.log("resultado " + res);
			});
			res.status(204).send({
				"route":"track",
				"operation":"POST"
			});
  		}
  	);
};