import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true }
});

export const EmployeeModel = mongoose.model('Employee', employeeSchema);