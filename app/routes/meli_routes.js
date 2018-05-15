// routes/watson_routes.js
var dexterGenericStringFemale = "https://api.mercadolibre.com/sites/MLA/search?seller_id=306401715&category=MLA109027&gender=female";

var dexterGenericStringMale = "https://api.mercadolibre.com/sites/MLA/search?seller_id=306401715&category=MLA109027&gender=male";

const axios = require('axios');

module.exports = function(app, db_client) {

	function filterList(url, filter_id, filter_value) {
		var urlFinal = url+'&'+filter_id+'='+filter_value;
		console.log("voy a ir con la " + urlFinal);
		return axios.get(
			urlFinal,
			{
            	headers: {
            		'Content-Type': 'application/json'
            	}
        	}
			);
	}

	app.post('/meli/dexter/shoes',
		(req, res) => {
			var dexterGenericString;
			// Filtro por género
			if(req.body.gender) {
				if(req.body.gender == 'male') {
					dexterGenericString = dexterGenericStringMale;
				}
				else if(req.body.gender == 'female') {
					dexterGenericString = dexterGenericStringFemale;
				}
			}

			// Filtro por talle

			console.log("voy a consultar a " + dexterGenericString);
	    	axios.get(dexterGenericString, 
            {
            	headers: {
            		'Content-Type': 'application/json'
            	}
        	}
            )
			  .then(response => {

			  	var nextFilters = response.data.available_filters;

			  	var talle = req.body.talle;
			  	var selectedFilter = nextFilters.find(elem => elem.name.toLowerCase() == 'talle');
			  	var selectedFilterValues = selectedFilter.values.find(elem => elem.name.toLowerCase() == talle.toString());

			  	var allResults = response.data.results;
			  	var filteredResult = allResults;

			  	filterList(dexterGenericString, selectedFilter.id, selectedFilterValues.id)
			  	.then((result) => {
			  		var filteredData = result.data.results;

			  		if(req.body.max_price) {
			  			filteredData = filteredData.filter(elem => elem.price <= req.body.max_price);
			  		}

			  		if(req.body.min_price) {
			  			filteredData = filteredData.filter(elem => elem.price >= req.body.min_price);
			  		}


			  		res.send({ 
					    "total_length" : filteredData.length,
					    "data" : filteredData[Math.floor(Math.random() * (filteredData.length-1)) + 0  ]
					});
			  	})
			  	.catch((err) => {

			  		console.log(err);
			  		res.send({"err" : err});
			  	});


			  })
			  .catch(error => {
			  	console.log(error);
			    res.send({ "err" : error });
			  });
  		}
  	);
};