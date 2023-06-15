const router = require('express').Router();
const auth = require('../middleware/auth');
const Report = require('../models/report');

// Generate a report
router.post('/generate', auth, async (req, res) => {
  try {
    // Generate the report data
    const occupancyRate = calculateOccupancyRate();
    const revenue = calculateRevenue();
    const averageLengthOfStay = calculateAverageLengthOfStay();

    // Create a new report
    const report = new Report({
      reportType: 'Occupancy and Revenue',
      data: {
        occupancyRate,
        revenue,
        averageLengthOfStay,
      },
      generatedAt: new Date(),
    });

    // Save the report to the database
    await report.save();

    res.status(201).send({ data: report });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all reports
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find().sort({ generatedAt: -1 });
    res.status(200).send({ data: reports });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

async function calculateOccupancyRate() {

  const totalRooms = await Room.countDocuments();
  const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
  const occupancyRate = (occupiedRooms / totalRooms) * 100;
  return occupancyRate;
}
async function calculateRevenue() {
  
  const bookings = await Booking.find();
  const revenue = bookings.reduce((total, booking) => total + booking.price, 0);
  return revenue;
}


async function calculateAverageLengthOfStay() {
  
  const bookings = await Booking.find();
  const totalLengthOfStay = bookings.reduce((total, booking) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const lengthOfStay = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return total + lengthOfStay;
  }, 0);
  const averageLengthOfStay = totalLengthOfStay / bookings.length;
  return averageLengthOfStay;
}

module.exports = router;
