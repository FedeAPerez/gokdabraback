// routes/messages_routes.js
module.exports = function(app, db_client, DB_ENV) {

	app.get('/messages/business/:id_business/user/:id_user', 
		(req, res) => {
			const messagesCollection = db_client.db(DB_ENV).collection("messages");
			messagesCollection.find({
				id_business : req.params.id_business,
				id_user : req.params.id_user
			}).toArray()
			.then((getResult) => {
				res.send({
					"route":"messages",
					"operation":"GET",
					"status_code":200,
					"data": getResult
				});
			})
			.catch((err) => {
				res.send({
					"route":"messages",
					"operation":"GET",
					"status_code":500,
					"data": err
				});
			});

		}
	);


	app.post('/messages/business/:id_business/user/:id_user', 
			(req, res) => {
				const messagesCollection = db_client.db(DB_ENV).collection("messages");
				messagesCollection.insertOne({
					id_business : req.params.id_business,
					id_user : req.params.id_user,
					message : req.body.message,
					sender : req.body.sender,
					timestamp : Date.now()
				})
				.then((insertResult) => {
					res.send({
						"route":"messages",
						"operation":"POST",
						"status_code":200,
						"data": insertResult
					});
				})
				.catch((err) => {
					res.send({
						"route":"messages",
						"operation":"POST",
						"status_code":500,
						"data": err
					});
				});

			}
	);
  
};