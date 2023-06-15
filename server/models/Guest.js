const mongoose = require('mongoose');
const Joi = require('joi');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  identityProof: {
    type: String,
    required: true,
  },
  assignedRoom: {
    type: String,
    required:true
  },
  checkInDate: {
    type: Date,
    default: Date.now,
  },
  checkOutDate: {
    type: Date,
    required:true
  },
});

const Guest = mongoose.model('Guest', guestSchema);

function validateGuest(guest) {
  const schema = Joi.object({
    name: Joi.string().required(),
    contactInfo: Joi.string().required(),
    identityProof: Joi.string().required(),
    assignedRoom: Joi.string().required(),
    checkInDate: Joi.date().required(),
    checkOutDate: Joi.date(),
  });
  return schema.validate(guest);
}

module.exports = { Guest, validateGuest };
