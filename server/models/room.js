const mongoose = require('mongoose');
const Joi = require('joi');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:"empty"
  },
});

const Room = mongoose.model('Room', roomSchema);

function validateRoom(room) {
  const schema = Joi.object({
    roomNumber: Joi.string().required(),
    type: Joi.string().required(),
    capacity: Joi.number().required(),
    status: Joi.string().required(),
  });
  return schema.validate(room);
}

module.exports = { Room, validateRoom };
