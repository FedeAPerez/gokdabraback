// routes/index.js
const watsonRoutes = require('./watson_routes');
const docRoutes = require('./doc_routes');
const businessRoutes = require('./business_routes');
const messagesContentRoutes = require('./messages_content_routes');
const meliRoutes = require('./meli_routes');
const trackRoutes = require('./track_routes');
const optionsRoutes = require('./options_routes');
const optionsBusinessRoutes = require('./options_business_routes');

module.exports = function(app, db_client, db_env) {
  watsonRoutes(app, db_client, db_env);
  docRoutes(app, db_client, db_env);
  businessRoutes(app, db_client, db_env);
  messagesContentRoutes(app, db_client, db_env);
  meliRoutes(app, db_client, db_env);
  trackRoutes(app, db_client, db_env);
  optionsRoutes(app, db_client, db_env);
  optionsBusinessRoutes(app, db_client, db_env);
};