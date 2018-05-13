// routes/index.js
const watsonRoutes = require('./watson_routes');
const docRoutes = require('./doc_routes');
const businessRoutes = require('./businessRoutes');

module.exports = function(app) {
  watsonRoutes(app);
  docRoutes(app);
  businessRoutes(app);
};