import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  timestamp: { type: Date, required: true },
  type: { type: String, enum: ['check-in', 'check-out'], required: true }
});

export const AttendanceModel = mongoose.model('Attendance', attendanceSchema);