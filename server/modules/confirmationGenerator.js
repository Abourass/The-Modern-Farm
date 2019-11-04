'use strict';

const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); // Initialize Twilio
const User = require('../models/userModel');
const Realtor = require('../models/realtorModel');
const TempRealtor = require('../models/tempRealtorModel');
const Confirmation = require('../models/confirmationsModel');
const {formatDate} = require('./date');
const debug = console.error;

const houseWords = ['air-conditioner', 'appliances', 'attic', 'awning', 'back-door', 'backyard',
  'baluster', 'barbecue', 'baseboard', 'basement', 'bathroom', 'bathtub', 'beam', 'bedroom', 'blinds', 'broom', 'bunk-bed',
  'carpet', 'carport', 'ceiling', 'cellar', 'chimney', 'closet', 'clothes-dryer', 'clothes-washer', 'column', 'concrete',
  'cornice', 'counter', 'crib', 'cupboard', 'curtain-rod', 'curtains', 'dining-room', 'dish-washer', 'doggie-door',
  'doghouse', 'door', 'door-bell', 'door-jamb', 'doorknob', 'doorway', 'dormer', 'downspout', 'downstairs', 'drain',
  'drapes', 'driveway', 'dryer', 'duct', 'dustpan', 'eaves', 'electrical-outlet', 'electrical-system', 'entrance',
  'entry', 'entryway', 'gable', 'garage', 'garage-door', 'garage-door-opener', 'garbage-can', 'garden', 'garden-shed',
  'gate', 'girder', 'greenhouse', 'gutters', 'hall', 'hall-closet', 'hallway', 'hamper', 'heater', 'hinge', 'home', 'hose',
  'house', 'inglenook', 'insulation', 'jamb', 'key', 'kitchen', 'ladder', 'lamp', 'lanai', 'laundry', 'laundry-room',
  'lawnmower', 'library', 'light', 'light-switch', 'linen-closet', 'lintel', 'living-room', 'lock', 'loft', 'lumber',
  'mailbox', 'mantle', 'mat', 'mirror', 'mop', 'nook', 'nursery', 'overhang', 'painting', 'paneling', 'pantry', 'patio',
  'picture', 'picture-frame', 'plumbing', 'pool', 'porch', 'portico', 'quilt', 'railing', 'rake', 'range', 'recreation-room',
  'roof', 'room', 'rug', 'sash', 'screen-door', 'shed', 'shelf', 'shelves', 'shingle', 'shower', 'shutters', 'siding', 'sill',
  'sink', 'skylight', 'sliding-glass-door', 'staircase', 'stairs', 'stairway', 'steps', 'stoop', 'storage-shed', 'storm-door',
  'stove', 'swimming-pool', 'threshold', 'throw-rug', 'toilet', 'trash-can', 'trellis', 'trim', 'tub', 'upstairs', 'vacuum-cleaner',
  'vase', 'Venetian-blinds', 'vent', 'wainscoting', 'walkway', 'wall', 'wall-to-wall-carpet', 'washer', 'washing-machine',
  'waste-basket', 'water-heater', 'weather-stripping', 'welcome-mat', 'window', 'window-pane', 'window-sill', 'wood-stove', 'yard'];

const expireConfirmation = async(confirmationURL) => {
  try {
    await Confirmation.deleteOne({url: confirmationURL}).catch(err => debug(err));
  } catch (err) {
    debug(err);
  }
};

const confirmGenerator = async(userID, length) => {
  try {
    const generatedLink = [];
    while (generatedLink.length < length) {
      const word = houseWords[Math.floor((Math.random() * 172) + 1)];
      if (generatedLink.length === 0) {
        generatedLink.push(word);
      } else if (!generatedLink.includes(word)) {
        generatedLink.push(word);
      }
    }
    const safeLink = generatedLink.join('-');
    const foundUser = await User.findOne({_id: userID});
    const newConfirmation = new Confirmation({
      user: foundUser.id,
      url: safeLink,
      createdOn: formatDate(Date.now(), 'MMMM Do YYYY, h:mm:ss a'),
    });
    await newConfirmation.save();

    const msg = {
      to: {
        name: `${foundUser.fullNamePreferred}`,
        email: `${foundUser.email}`,
      },
      from: {
        name: 'Veritas Mail System',
        email: 'Veritas@assetval.com',
      },
      subject: 'Confirm your email with AssetVal',
      text: 'Please click this text to confirm your email',
      html: `<a href="https://www.assetval.club/userAuth/verify-email/${safeLink}">Please click this text to confirm your email</a>`,
    };
    await sgMail.send(msg);

    setTimeout(() => {
      expireConfirmation(safeLink);
    }, 8.64e+7);
  } catch (err) {
    debug(err);
  }
};

const forgotPassword = async(userID) => {
  try {
    let completionMsg;
    const foundUser = await User.findById(userID);
    if (!foundUser){console.log('No found user with the id:', userID)}
    const securityCode = Math.floor((Math.random() * Date.now()) / 1000000);
    if (foundUser.smsEnabled) {
      const newConfirmation = new Confirmation({
        user: foundUser.id,
        url: securityCode,
        type: 'passwordReset',
      });
      await newConfirmation.save().catch(err => debug(err));
      setTimeout(() => { expireConfirmation(securityCode).catch(err => debug);}, 8.64e+7);
      if (foundUser.groups.includes('realtor')){
        const foundRealtor = await Realtor.findOne({user: foundUser.id});
        if (!foundRealtor) {
          const foundTempRealtor = await TempRealtor.findOne({user: foundUser.id});
          await client.messages.create({
            body: `Veritas security code: ${securityCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${foundTempRealtor.plainPhone}`,
          });
          completionMsg = 'sms';
        }

        await client.messages.create({
          body: `Veritas security code: ${securityCode}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+1${foundRealtor.plainPhone}`,
        });
        completionMsg = 'sms';
      } else {
        await client.messages.create({
          body: `Veritas security code: ${securityCode}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+1${foundUser.plainPhone}`,
        });
        completionMsg = 'sms';
      }
    } else {
      const newConfirmation = new Confirmation({
        user: foundUser.id,
        url: securityCode,
        type: 'passwordReset',
      });
      await newConfirmation.save().catch(err => debug(err));
      const msg = {
        to: {
          name: `${foundUser.fullNamePreferred}`,
          email: `${foundUser.email}`,
        },
        from: {
          name: 'Veritas Mail System',
          email: 'Veritas@assetval.com',
        },
        subject: 'Reset your password on Veritas',
        text: `Your code is: ${securityCode}`,
        html: `<span>Your code is: </span><a href="https://www.assetval.club/reset/">${securityCode}</a>`,
      };
      await sgMail.send(msg);
      completionMsg = 'email';
    }
    return completionMsg;
  } catch (err) {
    debug(err);
  }
};

const twoFactorGenerator = async(userID) => {
  let completionMsg;
  const foundUser = await User.findOne({_id: userID});
  const securityCode = Math.floor((Math.random() * Date.now()) / 1000000);
  const newConfirmation = new Confirmation({
    user: foundUser.id,
    url: securityCode,
    service: '2FA',
  });
  await newConfirmation.save().catch(err => debug(err));
  setTimeout(() => { expireConfirmation(securityCode); }, 8.64e+7); // Deletes the confirmation entry after a day - When debugging I suggest 15000 so your confs delete themselves as you go
  if (foundUser.groups.includes('realtor')) {
    const foundRealtor = Realtor.findOne({user: foundUser.id});
    if (!foundRealtor) {
      const foundTempRealtor = await TempRealtor.findOne({user: foundUser.id});
      completionMsg = await client.messages.create({
        body: `Veritas security code: ${securityCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${foundTempRealtor.plainPhone}`,
      });
    } else {
      completionMsg = await client.messages.create({
        body: `Veritas security code: ${securityCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${foundRealtor.plainPhone}`,
      });
    }
  }
  return completionMsg;
};
module.exports = {
  twoFactorGenerator,
  forgotPassword,
  confirmGenerator
};
