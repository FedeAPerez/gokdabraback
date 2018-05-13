// routes/messages_content_routes.js
const env = process.env.DB_ENV;

module.exports = function(app, db_client) {
	app.get('/contentmessages', 
		(req,res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("contentmessages");
			prospectsCollection.find({}).toArray()
			.then((getResult) => {
				console.log(getResult);
				res.status(200).send({
					"route":"contentmessages",
					"operation":"GET",
					"data": getResult
				});
			})
			.catch((err) => {

			});

		}
	);

	app.post('/contentmessages',
		(req, res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("contentmessages");
			prospectsCollection.insertOne({
				id_content_message : req.body.id_content_message,
				content_message : req.body.content_message
			}, function(err, res) {
				console.log("errores " + err);
				console.log("resultado " + res);
			});
			res.status(204).send({
				"route":"contentmessages",
				"operation":"POST"
			});
  		}
  	);
};