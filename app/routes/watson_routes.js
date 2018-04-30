// routes/watson_routes.js

module.exports = function(app) {
	app.post('/intent',
		(req, res) => {
			console.log(req.body);
	    	// Gets the intent from watson
	    	var AssistantV1 = require('watson-developer-cloud/assistant/v1');
	    	var watsonAssistant = new AssistantV1({
			    version: '2018-02-16',
			    username: 'c8fb7c5c-0522-4312-9411-78b3ecff5b2c',
			    password: 'Vvg0jNDVKCBF',
			    url: 'https://gateway.watsonplatform.net/assistant/api'
			});

	    	watsonAssistant.message({
			  workspace_id: '630fdc49-dd87-4967-8047-35a0f2784fee',
			  input: {'text': req.body.message}
			},  function(err, response) {
			  if (err) {
			    res.status(400).send({});
			  }
			  else {
			  		console.log(JSON.stringify(response, null, 2));
			  		if(response.intents[0]) {
					    res.status(200).send({
					    	"status":"OK Response",
					    	"intent": response.intents[0].intent
					    });
					}
					else {
						res.status(400).send({
							"operation":"getIntent",
							"status":"400"
						});
					}
				}
			});
  		}
  	);
};