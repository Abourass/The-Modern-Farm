const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  address: {type: String},
  address_2: {type: String},
  accessName: {type: String},
  accessPhone: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  QA_processor: {type: String},
  BPO_manager: {type: String},
  rush_order: {type: String},
  city: {type: String},
  state: {type: String},
  borrower: {type: String},
  zip: {type: String},
  interiorOrExterior: {type: String},
  Rush: {type: String},
  loanNumber: {type: String},
  BPO_Order_ID: {type: String},
  billingCode: {type: String},
  Client: {type: String},
  propertyType: {type: String},
  DNA_APN: {type: String},
  DNA_Year_Built: {type: String},
  DNA_SqFt: {type: String},
  DNA_LotSize: {type: String},
  DNA_Bed: {type: String},
  DNA_Bath: {type: String},
  DNA_Latitude: {type: String},
  DNA_Longitude: {type: String},
  loanKey: {type: String},
  notes: {type: String},
  unit: {type: String},
  dueDates: {type: String},
  batchName: {type: String},
  lockBox: {type: String},
  requestor: {type: String},
  productType: {type: String},
  int_ext: {type: String},
  ext_int: {type: String},
  unitNumber: {type: String},
  added: {type: Date, default: Date.now()},
  project: {type: Schema.Types.ObjectId, ref: 'projects'},
  log: {type: Array},
  projectStack: {
    type: Schema.Types.ObjectId,
    ref: 'projects'
  },
  tags: {
    type: Array
  }
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

OrderSchema.virtual('loanNum').get(function(){
  if (this.loanKey.length > 0){return this.loanKey.trim()}
  if (this.loanNumber.length > 0){return this.loanNumber.trim()}
  return null
});

module.exports = mongoose.model('orders', OrderSchema);
