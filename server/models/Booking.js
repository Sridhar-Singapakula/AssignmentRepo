const mongoose = require('mongoose');
const Joi = require('joi');

const bookingSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

function validateBooking(booking) {
  const schema = Joi.object({
    guestId: Joi.string().required(),
    roomId: Joi.string().required(),
    bookingDate: Joi.date().required(),
  });
  return schema.validate(booking);
}

module.exports = { Booking, validateBooking };
