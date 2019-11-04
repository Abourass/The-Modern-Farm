const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const ip = require('ip');
const routing = require('./routes/routeHandler.js');
const {port, mongo} = require('./utils/port.js');
mongoose.connect(mongo.uri, mongo.config).catch(err => console.error); // Create Database Connection

const app = new Koa(); // Create Koa Server


app.use(logger()).use(koaBody()).use(helmet()); // Invoke Middleware

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access. \n';
    } else {
      throw err;
    }
  });
});

routing(app); // Start Routes

app.listen(port, () => { console.log(`Server is now running on http://${ip.address()}:${port}`);}); // Start the server
module.exports = app;
