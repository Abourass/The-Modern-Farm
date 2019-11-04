const routesLoader = require('../utils/routesLoader');

module.exports = async function(app) {
  const files = await routesLoader(`${__dirname}`);
  files.forEach(route => { app.use(route.routes()).use(route.allowedMethods({throw: true}));});
};
