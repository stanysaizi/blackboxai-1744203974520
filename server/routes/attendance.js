const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');
const { protect, authorize } = require('../middleware/auth');

// Employee routes
router.post('/checkin', protect, attendanceController.checkIn);
router.put('/checkout', protect, attendanceController.checkOut);
router.get('/my-attendance', protect, attendanceController.getMyAttendance);

// Admin routes
router.get('/', protect, authorize('admin'), attendanceController.getAllAttendance);
router.get('/:id', protect, authorize('admin'), attendanceController.getAttendance);
router.put('/:id/status', protect, authorize('admin'), attendanceController.updateStatus);
router.get('/department/:dept', protect, authorize('admin'), attendanceController.getDepartmentAttendance);

module.exports = router;
