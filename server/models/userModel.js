'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  nickname: {
    type: String,
  },
  birthday: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  gender: {
    type: String,
    default: 'undisclosed',
  },
  secondLanguage: {
    type: String,
    default: 'None',
  },
  email: {
    type: String,
  },
  phoneNumber: {// We have both phoneNumber AND phone TODO
    type: String,
  },
  phoneType: {// Is this used?? TODO
    type: String,
  },
  imgDef: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    default: 'Vendor',
  },
  password: {
    type: String,
  },
  phone: {// We have both phoneNumber AND phone TODO
    type: String,
  },
  userCreated: {
    type: Date,
    format: 'MMM Do YYYY',
  },
  updated: {
    type: Date,
    format: 'MMM Do YYYY',
  },
  groups: {
    type: String,
    default: 'realtor',
  },
  profileStatus: {
    type: String,
  },
  securityID: {
    type: String,
  },
  logoChoice: {
    type: String,
    default: 'default',
  },
  sidebarChoice: {
    type: Boolean,
    default: false,
  },
  quickSwitcher: {
    type: Boolean,
    default: false,
  },
  hasMessages: {
    type: Boolean,
    default: false,
  },
  msgToken: {
    type: String,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  smsEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorAuth: {
    type: Boolean,
  },
  accessLevel: {
    type: String,
    default: 'limited',
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
  log: {
    type: Array,
  },
  jsonAuth: {
    type: String,
  },
  activityQueue: [
    {
      sentFrom: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      sentFromImgDef: {
        type: Boolean,
      },
      sentFromInitials: {
        type: String,
      },
      activityType: {
        type: String,
      },
      status: {
        type: String,
      },
      previewText: {
        type: String,
      },
      sentAt: {
        type: Date,
      },
      unread: {
        type: Boolean,
        default: true,
      },
      url: {
        type: String,
      },
    },
  ],
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

// eslint-disable-next-line func-names
UserSchema.virtual('role').get(function() {
  let role;
  if (this.groups === 'isIT') {
    if (this.desc) {
      role = this.desc;
    } else {
      role = 'I.T. Staff';
    }
  } else if (this.groups === 'realtor') {
    role = 'Vendor';
  } else if (this.groups === 'Admin') {
    role = 'AssetVal Employee';
  } else if (this.groups === 'client') {
    role = 'Client';
  }
  return role;
});

UserSchema.virtual('firstLastInitials').get(function() {
  return `${this.firstName.charAt(0)} ${this.lastName.charAt(0)}`.trim();
});

UserSchema.virtual('fullNamePreferred').get(function() {
  return `${this.nickname} ${this.middleName} ${this.lastName}`.trim();
});

UserSchema.virtual('fullNameLegal').get(function() {
  return `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
});

module.exports = mongoose.model('users', UserSchema);
