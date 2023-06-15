const router = require("express").Router();
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { Booking, validateBooking } = require('../models/booking');

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { error } = validateBooking(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { guestId, roomId, bookingDate } = req.body;

    const booking = new Booking({
      guestId,
      roomId,
      bookingDate,
    });

    await booking.save();

    res.status(201).send({ data: booking });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update a booking
router.put('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { error } = validateBooking(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    res.status(200).send({ data: booking, message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a booking
router.delete('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    res.status(200).send({ data: booking, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send({ data: bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
