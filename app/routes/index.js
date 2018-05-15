// routes/index.js
const watsonRoutes = require('./watson_routes');
const docRoutes = require('./doc_routes');
const businessRoutes = require('./business_routes');
const messagesContentRoutes = require('./messages_content_routes');
const meliRoutes = require('./meli_routes');
const trackRoutes = require('./track_routes');

module.exports = function(app, db_client) {
  watsonRoutes(app, db_client);
  docRoutes(app, db_client);
  businessRoutes(app, db_client);
  messagesContentRoutes(app, db_client);
  meliRoutes(app, db_client);
  trackRoutes(app, db_client);
};