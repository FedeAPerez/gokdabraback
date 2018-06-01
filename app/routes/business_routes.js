// routes/business_routes.js
module.exports = function(app, db_client, DB_ENV) {
	app.get('/business/prospect/all', 
		(req,res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("prospects");
			prospectsCollection.find({}).toArray()
			.then((getResult) => {
				res.send({
					"route":"prospect",
					"operation":"GET",
					"status_code":200,
					"data": getResult
				});
			})
			.catch((err) => {
				res.send({
					"route":"prospect",
					"operation":"GET",
					"status_code":500,
					"data": err
				});
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
				res.send({
					"route":"prospect",
					"operation":"POST",
					"status_code":204,
					"data": insertResult,
					"show_message": "Mmm... parece que esta dirección de mail ya tiene registrado un negocio."
				});
			})
			.catch((err) => {
				res.send({
					"route":"prospect",
					"operation":"POST",
					"status_code":500,
					"data": err
				});
			});

  		}
	  );
	  
	  app.get('/business/all', 
	  (req,res) => {
		  const prospectsCollection = db_client.db(DB_ENV).collection("business");
		  prospectsCollection.find({}).toArray()
		  .then((getResult) => {
			  res.send({
				  "route":"business",
				  "operation":"GET",
				  "data": getResult,
				  "status_code":200
			  });
		  })
		  .catch((err) => {
			res.send({
				"route":"business",
				"operation":"GET",
				"status_code":500,
				"data": err
			});
		  });

	  }
  );

  	app.post('/business/',
  		(req, res) => {
  			// Obtención del body
  			var timestamp = new Date();
  			var contact_mail = req.body.contact_mail;
  			var business_name = req.body.business_name;

  			const businessCollection = db_client.db(DB_ENV).collection("business");

			// Veo que no haya un mismo mail para el negocio dos veces
			businessCollection.find({
				contact_mail : contact_mail
			}).toArray()
			.then((findResult) => {
				if(findResult.length == 0) {
					// debería ser si no hay nada, n osi no puedo acceder
					businessCollection.find({
						business_name : business_name
					}).toArray()
					.then((findResultUser) => {
						if(findResultUser.length == 0) {
							businessCollection.insertOne({
								business_name : business_name,
								timestamp : timestamp,
								contact_mail : contact_mail
							})
							.then((insertResult) => {
								res.send({
									"route":"business",
									"operation":"POST",
									"status_code":200,  
									"data":insertResult
								});
							})
							.catch((insertError) => {
								res.send({
									"route":"business",
									"operation":"POST",
									"status_code":500
								});
							});
						}
						else {
							res.send({
								"route":"business",
								"operation":"POST",
								"status_code":400,
								"status_message":"BUSINESSNAMEEXISTENT",
								"show_message": "Mmm... parece que esta dirección de mail ya tiene registrado un negocio."
							});
						}
					})
					.catch((err) => {
						res.send({
							"route":"business",
							"operation":"POST",
							"status_code":500
						});
					});

				}
				else {
					res.send({
						"route":"business",
						"operation":"POST",
						"status_code":400,
						"status_message":"BUSINESSMAILEXISTENT",
						"show_message": "Mmm... parece que esta dirección de mail ya tiene registrado un negocio."
					});
				}
			})
			.catch((findResultEror) => {
				res.send({
					"route":"business",
					"operation":"POST",
					"status_code":500
				});
			});
  		}
  	);

  	app.get('/business/:business_name', 
		(req,res) => {
			const prospectsCollection = db_client.db(DB_ENV).collection("business");
			prospectsCollection.findOne({
				"business_name" : req.params.business_name
			})
			.then((getResult) => {
				console.log(getResult);
				res.send({
					"route":"business",
					"operation":"GET",
					"status_code":200,
					"data": getResult
				});
			})
			.catch((err) => {
				res.send({
  					"route":"business",
  					"operation":"GET",
  					"status_code":500
  				});
			});

		}
	);
};