const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Room, validateRoom } = require('../models/room');

// Create a new room
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { error } = validateRoom(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { roomNumber, type, capacity,status } = req.body;

    const room = new Room({
      roomNumber,
      type,
      capacity,
      status
    });

    await room.save();

    res.status(201).send({ data: room });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update room details
router.put('/:id', [validateObjectId, auth, admin], async (req, res) => {
  try {
    const { error } = validateRoom(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    res.status(200).send({ data: room, message: 'Room updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a room
router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  try {
    const room = await Room.findByIdAndRemove(req.params.id);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    res.status(200).send({ data: room, message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send({ data: rooms });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
