const jsonWebToken = require('koa-jwt');
const jwt = jsonWebToken({secret: process.env.jsonSecret});
module.exports = jwt;
