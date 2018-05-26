// routes/options_business_routes.js

module.exports = function(app, db_client, DB_ENV) {
	app.get('/optionsbusiness/:id_business/delete', 
		(req,res) => {
			var id_business = req.params.id_business;
			const optionsBusinessCollection = db_client.db(DB_ENV).collection("options_business");
			optionsBusinessCollection.drop()
			.then((getResult) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":200,
					"options_list":getResult
				});
			})
			.catch((getError) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":500,
					"error":getError
				});
			});

		}
	);

	app.get('/optionsbusiness/:id_business', 
		(req,res) => {
			var id_business = req.params.id_business;
			const optionsBusinessCollection = db_client.db(DB_ENV).collection("options_business");
			optionsBusinessCollection.find({
				id_business : id_business
			}).toArray()
			.then((getResult) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":200,
					"options_list":getResult
				});
			})
			.catch((getError) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":500,
					"error":getError
				});
			});

		}
	);

	app.get('/optionsbusiness/:id_business/:id_option', 
		(req,res) => {
			var id_business = req.params.id_business;
			var id_option = req.params.id_option;

			const optionsBusinessCollection = db_client.db(DB_ENV).collection("options_business");
			optionsBusinessCollection.findOne({
				id_business:id_business,
				id_option : id_option
			})
			.then((getResult) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":200,
					"show_message":getResult.show_message
				});
			})
			.catch((getError) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"GET",
					"status_code":500,
					"error":getError
				});
			});

		}
	);

	app.post('/optionsbusiness/collection', (req, res) => {
		const optionsBusinessCollection = db_client.db(DB_ENV).collection("options_business");
		optionsBusinessCollection.createIndex( { "id_business": 1, "id_option": 1}, { unique: true } )
		.then((resu) => {
			res.send({"resu" : resu});
		})
		.catch((err) => {
			res.send({"resu" : err});
		});
	});

	app.post('/optionsbusiness/:id_business/:id_option', 
		(req,res) => {
			var id_business = req.params.id_business;
			var id_option = req.params.id_option;
			var show_message = req.body.show_message;

			const optionsBusinessCollection = db_client.db(DB_ENV).collection("options_business");
				optionsBusinessCollection.updateOne(
					{id_business: id_business, id_option:id_option },
					{	$set: {id_business: id_business, id_option:id_option, show_message: show_message }},
					{
						upsert:true,
						multi: false
					}
				)
			.then((updateOneResult) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"POST",
					"status_code":200,
					"result":updateOneResult
				});
			})
			.catch((getError) => {
				res.send({
					"route":"optionsbusiness",
                    "operation":"POST",
					"status_code":500,
					"error":getError
				});
			});
		}
	);
};