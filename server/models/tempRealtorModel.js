'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TempRealtorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  eSigStatus: {
    type: Boolean,
    default: false,
  },
  eSigGeneratorPreferred: {
    type: Boolean,
    default: true,
  },
  eSigGeneratorFont: {
    type: String,
  },
  secondaryEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  phoneType: {
    type: String,
  },
  website: {
    type: String,
  },
  realtorCode: {
    type: Number,
  },
  hasREOExperience: {
    type: Boolean,
    default: false,
  },
  primaryLicenseNumber: {
    type: String,
  },
  primaryLicenseExpiration: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  primaryLicenseType: {
    type: String,
  },
  primaryLicenseState: {
    type: String,
  },
  primaryLicenseIsExpired: {
    type: Boolean,
  },
  primaryLicenseUploaded: {
    type: Boolean,
    default: false,
  },
  secondaryLicenseNumber: {
    type: String,
  },
  secondaryLicenseExpiration: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  secondaryLicenseType: {
    type: String,
  },
  secondaryLicenseState: {
    type: String,
  },
  secondaryLicenseIsExpired: {
    type: String,
  },
  secondaryLicenseUploaded: {
    type: Boolean,
    default: false,
  },
  yearBecameActiveInMarketArea: {
    type: String,
  },
  yearBecameRealEstateAgent: {
    type: String,
  },
  residentialSalesClosedLastYear: {
    type: Number,
  },
  realEstateExperience: {
    type: String,
  },
  yearBecameActiveInREOSales: {
    type: String,
  },
  reoSalesLastYear: {
    type: String,
  },
  reoExperience: {
    type: String,
  },
  brokerFullName: {
    type: String,
  },
  brokerageName: {
    type: String,
  },
  brokerageStreetAddress: {
    type: String,
  },
  brokerageUnitNumber: {
    type: String,
  },
  brokerageCity: {
    type: String,
  },
  brokerageState: {
    type: String,
  },
  brokerageZip: {
    type: Number,
  },
  brokeragePhone: {
    type: String,
  },
  brokeragePhoneExt: {
    type: String,
  },
  useWhichAddress: {
    type: String,
  },
  homeStreetAddress: {
    type: String,
  },
  homeUnitNumber: {
    type: String,
  },
  homeCity: {
    type: String,
  },
  homeState: {
    type: String,
  },
  homeZip: {
    type: Number,
  },
  homePhone: {
    type: String,
  },
  homePhoneExt: {
    type: String,
  },
  ordersAtOnce: {
    type: Number,
  },
  willPerform: {
    type: String,
  },
  onVacation: {
    type: Boolean,
    default: false,
  },
  vacationBegins: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  vacationEnds: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  yearBecameActiveInCommerc: {
    type: String,
  },
  commercialSalesLastYear: {
    type: String,
  },
  commercialRealEstateExperience: {
    type: String,
  },
  selfDesignation: {
    type: Array,
  },
  commercialOtherDescript: {
    type: String,
  },
  informationSources: {
    type: Array,
  },
  commercialInfoOtherDescript: {
    type: String,
  },
  liabilityPolicy: {
    type: Boolean,
    default: false,
  },
  liabilityPolicyProvider: {
    type: String,
  },
  liabilityPolicyExpiration: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  liabilityPolicyLimit: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  bankName: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  bankAccountName: {
    type: String,
  },
  bankRoutingNum: {
    type: String,
  },
  bankAccountNum: {
    type: String,
  },
  bankAccountType: {
    type: String,
  },
  businessBankName: {
    type: String,
  },
  businessBankAccount: {
    type: String,
  },
  businessBankAccountName: {
    type: String,
  },
  businessBankRoutingNum: {
    type: String,
  },
  businessBankAccountNum: {
    type: String,
  },
  businessBankAccountType: {
    type: String,
  },
  mailCheckTo: {
    type: String,
  },
  social: {
    type: String,
  },
  last3OfSocial: {
    type: String,
  },
  taxIdNumber: {
    type: String,
  },
  last3OfTaxId: {
    type: String,
  },
  paidToCompanyName: {
    type: String,
  },
  payToName: {
    type: String,
  },
  payToCareOf: {
    type: String,
  },
  licensedInMultipleStates: {
    type: Boolean,
    default: false,
  },
  statesLicensedIn: {
    type: Array,
  },
  licensedAppraiser: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    format: 'MMMM Do YYYY, h:mm',
  },
  updated: {
    type: Date,
    default: Date.now,
    format: 'MMMM Do YYYY, h:mm',
  },
  profileCreated: {
    type: Boolean,
    default: false,
  },
  indemnified: {
    type: Boolean,
    default: false,
  },
  interiorExclusionRealtor: {
    type: Boolean,
  },
  noMLSinArea: {
    type: Boolean,
  },
  mlsDataSources: {
    type: Array,
    default: ['None'],
  },
  primaryPhone: {
    type: String,
  },
  smsEnabled: {
    type: Boolean,
    default: false,
  },
  smsAgreementSigned: {
    type: Boolean,
    default: false,
  },
  receive2FA: {
    type: Boolean,
    default: false,
  },
  notifications: {
    sms: {
      type: Array,
    },
    email: {
      type: Array,
    },
  },
  readyForVerificationQueue: {
    type: Boolean,
    default: false,
  },
  log: {
    type: Array,
  },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

TempRealtorSchema.virtual('proximityAddress').get(function() {
  let address = {};
  if (this.useWhichAddress === 'useHomeOfficeAddress') {
    address = {
      street: this.homeStreetAddress,
      unitNumber: this.homeUnitNumber,
      city: this.homeCity,
      state: this.homeState,
      zip: this.homeZip,
    };
  } else if (this.useWhichAddress === 'useBrokerageAddress') {
    address = {
      street: this.brokerageStreetAddress,
      unitNumber: this.brokerageUnitNumber,
      city: this.brokerageCity,
      state: this.brokerageState,
      zip: this.brokerageZip,
    };
  }
  return address;
});

TempRealtorSchema.virtual('contactNumber').get(function() {
  let pNumber;
  if (this.primaryPhone === 'primaryPhone1') {
    pNumber = this.phoneNumber;
  } else if (this.primaryPhone === 'primaryPhone2') {
    if (!this.brokeragePhoneExt) {
      pNumber = `${this.brokeragePhone}`;
    } else {
      pNumber = `${this.brokeragePhone}+${this.brokeragePhoneExt}`;
    }
  } else if (this.primaryPhone === 'primaryPhone3') {
    pNumber = this.homePhone;
  }
  return pNumber;
});

TempRealtorSchema.virtual('brokeragePlusExt').get(function() {
  let pNumber;
  if (!this.brokeragePhoneExt) {
    pNumber = `${this.brokeragePhone}`;
  } else {
    pNumber = `${this.brokeragePhone}+${this.brokeragePhoneExt}`;
  }
  return pNumber;
});

TempRealtorSchema.virtual('homeUnitBool').get(function() {
  if (!this.homeUnitNumber) {
    return false;
  }
  return true;
});

TempRealtorSchema.virtual('brokerageUnitBool').get(function() {
  if (!this.brokerageUnitNumber) {
    return false;
  }
  return true;
});

TempRealtorSchema.virtual('brokerageUnitBool').get(function() {
  if (!this.brokerageUnitNumber) {
    return false;
  }
  return true;
});

TempRealtorSchema.virtual('twoLicenseAndInsurance').get(function() {
  return !(!this.licensedInMultipleStates || !this.liabilityPolicy);
});

TempRealtorSchema.virtual('female').get(function() {
  return this.user.gender === 'female';
});

TempRealtorSchema.virtual('male').get(function() {
  return this.user.gender === 'male';
});

TempRealtorSchema.virtual('plainPhone').get(function() {
  let pNumber;
  if (this.primaryPhone === 'primaryPhone1') {
    pNumber = this.phoneNumber;
  } else if (this.primaryPhone === 'primaryPhone2') {
    if (!this.brokeragePhoneExt) {
      pNumber = `${this.brokeragePhone}`;
    } else {
      pNumber = `${this.brokeragePhone}+${this.brokeragePhoneExt}`;
    }
  } else if (this.primaryPhone === 'primaryPhone3') {
    pNumber = this.homePhone;
  }
  return pNumber.match(/\d/g).join('');
});

module.exports = mongoose.model('tempRealtors', TempRealtorSchema);
