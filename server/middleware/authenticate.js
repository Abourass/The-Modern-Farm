const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

module.exports = async ctx => {
  try {
    const foundUser = await User.findOne({_id: ctx.request.body.id});
    if (!foundUser){
      ctx.status = 401;
      ctx.body = {message: 'Authentication Failed - No User'};
      return ctx;
    }
    ctx.status = 200;
    if (!foundUser.jsonAuth){
      foundUser.jsonAuth = jwt.sign({role: 'admin'}, process.env.jsonSecret);
      const updatedUser = await foundUser.save();
      ctx.body = {message: `${updatedUser.firstName} ${updatedUser.lastName} now has a JSON Auth Token`}
    } else {
      const newAuthToken = jwt.sign({role: 'admin'}, process.env.jsonSecret);
      if (foundUser.jsonAuth !== newAuthToken){
        foundUser.jsonAuth = newAuthToken;
        const updatedUser = await foundUser.save();
        ctx.body = {message: `${foundUser.firstName} ${foundUser.lastName} JSON Auth Token had expried, so we refreshed it`, token: updatedUser.jsonAuth}
      } else {
        ctx.body = {message: `${foundUser.firstName} ${foundUser.lastName} already has a JSON Auth Token`}
      }
    }
    return ctx;
  } catch (err) {
    console.error(err)
  }
};

