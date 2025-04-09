const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { calculateLateMinutes } = require('../utils/attendanceUtils');

// @desc    Check in employee
// @route   POST /api/attendance/checkin
// @access  Private
exports.checkIn = async (req, res) => {
  try {
    // Check if already checked in today
    const today = new Date().setHours(0, 0, 0, 0);
    const existing = await Attendance.findOne({
      employee: req.user.id,
      date: { $gte: today }
    });

    if (existing) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      employee: req.user.id,
      checkIn: Date.now(),
      status: calculateLateMinutes(req.user.department) > 0 ? 'late' : 'present',
      lateMinutes: calculateLateMinutes(req.user.department),
      location: req.body.location // { type: 'Point', coordinates: [long, lat] }
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Check out employee
// @route   PUT /api/attendance/checkout
// @access  Private
exports.checkOut = async (req, res) => {
  try {
    // Find today's attendance record
    const today = new Date().setHours(0, 0, 0, 0);
    const attendance = await Attendance.findOne({
      employee: req.user.id,
      date: { $gte: today }
    });

    if (!attendance) {
      return res.status(400).json({ message: 'No check-in record found for today' });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: 'Already checked out today' });
    }

    // Update check-out time
    attendance.checkOut = Date.now();
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get logged in user's attendance
// @route   GET /api/attendance/my-attendance
// @access  Private
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ employee: req.user.id })
      .sort('-date')
      .populate('employee', 'name email department');

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private/Admin
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .sort('-date')
      .populate('employee', 'name email department');

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get attendance by department
// @route   GET /api/attendance/department/:dept
// @access  Private/Admin
exports.getDepartmentAttendance = async (req, res) => {
  try {
    const users = await User.find({ department: req.params.dept });
    const userIds = users.map(user => user._id);

    const attendance = await Attendance.find({ employee: { $in: userIds } })
      .sort('-date')
      .populate('employee', 'name email department');

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update attendance status
// @route   PUT /api/attendance/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    attendance.status = req.body.status;
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
