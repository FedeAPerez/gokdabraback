// routes/index.js
const watsonRoutes = require('./watson_routes');
const docRoutes = require('./doc_routes');
module.exports = function(app) {
  watsonRoutes(app);
  docRoutes(app);
};