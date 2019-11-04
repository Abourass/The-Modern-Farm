const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel.js');

class ClientController {
  async find(ctx) { ctx.body = await Client.find();} // Get all clients
  async findById(ctx) { // Find a Client
    try {
      const client = await Client.findById(ctx.params.id);
      if (!client) { ctx.throw(404); }
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async findByToken(ctx, key) {
    try {
      const token = await ctx.headers.authorization.substring(7, ctx.headers.authorization.length).toString();
      const client = await Client.findOne({jsonToken: token});
      if (!client){ctx.throw(404)}
      return client[key];
    } catch (err) {
      if (err.name === 'CastError') { ctx.throw(404, err); }
      ctx.throw(500);
    }
  }
  async add(ctx) { // Add A client
    try { ctx.body = await new Client(ctx.request.body).save(); } catch (err) { ctx.throw(422, err); }
  }
  async update(ctx) { // Update client
    try {
      const client = await Client.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!client) {ctx.throw(404);}
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
  async delete(ctx) { // Delete a client
    try {
      const client = await Client.findByIdAndRemove(ctx.params.id);
      if (!client) { ctx.throw(404); }
      ctx.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
  async authAll(ctx){
    try {
      const clients = await Client.find();
      for await (let client of clients){
        console.log(`${client.name} is now being processed`);
        client.jsonToken =  jwt.sign({id: client._id, role: 'client'}, process.env.jsonSecret);
        const authClient = await client.save();
        console.log('Processed!')
      }
      ctx.body = {"status": "done"};
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}
module.exports = new ClientController();
