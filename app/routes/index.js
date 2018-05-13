// routes/index.js
const watsonRoutes = require('./watson_routes');
const docRoutes = require('./doc_routes');
const businessRoutes = require('./business_routes');

module.exports = function(app, db_client) {
  watsonRoutes(app, db_client);
  docRoutes(app, db_client);
  businessRoutes(app, db_client);
};