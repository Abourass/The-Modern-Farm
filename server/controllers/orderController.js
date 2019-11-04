const Order = require('../models/ordersModel');

class OrderController {
  async find(ctx) { ctx.body = await Order.find();} // Get all clients
  async findById(ctx) { // Find a Order
    try {
      const order = await Order.find({project: ctx.params.id});
      if (!order) { ctx.throw(404); }
      ctx.body = order;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404); }
      ctx.throw(500);
    }
  }
  async add(ctx) { // Add A order
    try { ctx.body = await new Order(ctx.request.body).save(); } catch (err) { ctx.throw(422, err); }
  }
  async update(ctx) { // Update order
    try {
      const order = await Order.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!order) {ctx.throw(404);}
      ctx.body = order;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
  async delete(ctx) { // Delete a order
    try {
      const order = await Order.findByIdAndRemove(ctx.params.id);
      if (!order) { ctx.throw(404); }
      ctx.body = order;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { ctx.throw(404, err.name);}
      ctx.throw(500, err);
    }
  }
}
module.exports = new OrderController();
