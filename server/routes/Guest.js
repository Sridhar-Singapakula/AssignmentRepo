const router = require("express").Router();
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { Guest, validateGuest } = require('../models/Guest');

// Create a new guest
router.post('/', auth, async (req, res) => {
  try {
    const { error } = validateGuest(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { name, contactInfo, identityProof, assignedRoom, checkInDate, checkOutDate } = req.body;

    const guest = new Guest({
      name,
      contactInfo,
      identityProof,
      assignedRoom,
      checkInDate,
      checkOutDate,
    });

    await guest.save();

    res.status(201).send({ data: guest });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update guest details
router.put('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { error } = validateGuest(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guest) {
      return res.status(404).send({ message: 'Guest not found' });
    }

    res.status(200).send({ data: guest, message: 'Guest updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a guest
router.delete('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const guest = await Guest.findByIdAndRemove(req.params.id);
    if (!guest) {
      return res.status(404).send({ message: 'Guest not found' });
    }

    res.status(200).send({ data: guest, message: 'Guest deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all guests
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find().populate('assignedRoom');
    res.status(200).send({ data: guests });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




// Check-in: Create a new guest with assigned room and check-in date

router.post('/checkin', auth, async (req, res) => {
  try {
    const { error } = validateGuest(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, contactInfo, identityProof, assignedRoom } = req.body;

    const guest = new Guest({
      name,
      contactInfo,
      identityProof,
      assignedRoom,
      checkInDate: Date.now(),
    });

    await guest.save();

    res.status(201).send({ data: guest });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Check-out: Update the check-out date for a guest

router.put('/checkout/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { checkOutDate } = req.body;

    const guest = await Guest.findByIdAndUpdate(req.params.id, { checkOutDate }, { new: true });
    if (!guest) {
      return res.status(404).send({ message: 'Guest not found' });
    }

    res.status(200).send({ data: guest, message: 'Guest check-out updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
