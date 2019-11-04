const mongoose = require('mongoose')
const Confirmation = require('../models/confirmationsModel');
const sgMail = require('@sendgrid/mail');
const smsClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); // Initialize Twilio
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {confirmGenerator, forgotPassword, twoFactorGenerator} = require('../modules/confirmationGenerator');

class MessageController {
  async find(ctx){
    ctx.body = await Confirmation.find();
  }
  async sendEmail(ctx) {
    const msg = await ctx.request.body.email;
    sgMail(msg);
    ctx.body = JSON.stringify({ status: 'sent' });
  }
  async sendSMS(ctx) {
    const response = await smsClient.messages.create(ctx.request.body.sms);
    ctx.body = JSON.stringify({ status: 'sent', id: response.id });
  }
  async sendConfirmation(ctx){
    await confirmGenerator(ctx.request.body.id, ctx.request.body.confirmLength);
    ctx.body = JSON.stringify({ status: 'sent' });
  }
  async forgotPassword(ctx){
    await forgotPassword(ctx.request.body.id);
    ctx.body = JSON.stringify({status: 'reset'});
  }
  async twoFactor(ctx){
    await twoFactorGenerator(ctx.request.body.id);
    ctx.body = JSON.stringify({status: 'sent'})
  }
}
module.exports = new MessageController();
