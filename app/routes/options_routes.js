// routes/options_routes.js
module.exports = function(app, db_client, DB_ENV) {
	app.get('/options', 
		(req,res) => {
			const optionsCollection = db_client.db(DB_ENV).collection("options");
			optionsCollection.find({}).toArray()
			.then((getResult) => {
				res.send({
					"route":"options",
                    "operation":"GET",
					"status_code":200,
					"options_list":getResult
				});
			})
			.catch((getError) => {
				res.send({
					"route":"options",
                    "operation":"GET",
					"status_code":500,
					"error":getError
				});
			});

		}
	);

	app.post('/options/collection', 
		(req,res) =>{
			const optionsCollection = db_client.db(DB_ENV).collection("options");
			optionsCollection.createIndex( { "id_option": 1}, { unique: true } )
			.then((resu) => {
				res.send({"resu" : resu});
			})
			.catch((err) => {
				res.send({"resu" : err});
			});
	});

	app.post('/options/collection/delete', 
		(req,res) =>{
			const optionsCollection = db_client.db(DB_ENV).collection("options");
			optionsCollection.drop()
			.then((resu) => {
				res.send({"resu" : resu});
			})
			.catch((err) => {
				res.send({"resu" : err});
			});
	});

	app.post('/options', 
		(req,res) => {
			const optionsCollection = db_client.db(DB_ENV).collection("options");
			optionsCollection.insertMany([
				{
					id_option : "opening_hours",
					show_message : "Horarios de Atención"
				},
				{
					id_option : "map",
					show_message : "Lugar de Trabajo"
				},
				{
					id_option : "payments",
					show_message : "Métodos de Pago"
				},
				{
					id_option : "contact",
					show_message : "Formas de Contacto"
				},
				{
					id_option : "welcome",
					show_message : "Mensaje de Bienvenida"
				}
			])
			.then((insertResult) => {
				res.send({
					"route":"options",
                    "operation":"POST",
					"status_code":200,
					"options_list":insertResult
				});
			})
			.catch((insertError) => {
				res.send({
					"route":"options",
                    "operation":"POST",
					"status_code":500,
					"error":insertError
				});
			});

		}
	);

};