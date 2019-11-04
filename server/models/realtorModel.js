'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RealtorSchema = new Schema({
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
    default: 'viaBrokerage',
  },
  personalPaymentOptIn: {
    type: Boolean,
    default: false,
  },
  personalPaymentByCheck: {
    type: Boolean,
    default: false,
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
  smsNotification: {
    type: Array,
  },
  emailNotification: {
    type: Array,
  },
  readyForVerificationQueue: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  whenUnavailable: {
    type: Array,
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

// eslint-disable-next-line func-names
RealtorSchema.virtual('proximityAddress').get(function() {
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

RealtorSchema.virtual('homeAddress').get(function() {
  return {
    street: this.homeStreetAddress,
    unitNumber: this.homeUnitNumber,
    city: this.homeCity,
    state: this.homeState,
    zip: this.homeZip,
    phone: this.homePhone,
  };
});

RealtorSchema.virtual('brokerageAddress').get(function() {
  return {
    street: this.brokerageStreetAddress,
    unitNumber: this.brokerageUnitNumber,
    city: this.brokerageCity,
    state: this.brokerageState,
    zip: this.brokerageZip,
    phone: this.brokeragePhone,
  };
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('contactNumber').get(function() {
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

// eslint-disable-next-line func-names
RealtorSchema.virtual('brokeragePlusExt').get(function() {
  let pNumber;
  if (!this.brokeragePhoneExt) {
    pNumber = `${this.brokeragePhone}`;
  } else {
    pNumber = `${this.brokeragePhone}+${this.brokeragePhoneExt}`;
  }
  return pNumber;
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('homeUnitBool').get(function() {
  if (!this.homeUnitNumber) {
    return false;
  }
  return true;
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('brokerageUnitBool').get(function() {
  if (!this.brokerageUnitNumber) {
    return false;
  }
  return true;
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('brokerageUnitBool').get(function() {
  if (!this.brokerageUnitNumber) {
    return false;
  }
  return true;
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('twoLicenseAndInsurance').get(function() {
  return !(!this.licensedInMultipleStates || !this.liabilityPolicy);
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('female').get(function() {
  return this.user.gender === 'female';
});

// eslint-disable-next-line func-names
RealtorSchema.virtual('male').get(function() {
  return this.user.gender === 'male';
});

RealtorSchema.virtual('plainPhone').get(function() {
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

module.exports = mongoose.model('realtors', RealtorSchema);
